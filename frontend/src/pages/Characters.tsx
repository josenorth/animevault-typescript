import React, { useState } from 'react';
import { useAnimeCharacters } from '../hooks/useAnimeCharacters';
import { Character } from '../types/anime/AnimeCharacter';
import { Card, CardContent } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';

const Characters: React.FC = () => {
  const { data: characters, isLoading, error } = useAnimeCharacters(1); // Assuming we're fetching characters for anime with id 1
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  if (isLoading) return <CharactersLoading />;
  if (error) return <div>Error loading characters</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-heading font-bold text-purple">Anime Characters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters?.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => setSelectedCharacter(character)}
          />
        ))}
      </div>
      {selectedCharacter && (
        <CharacterDialog
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

const CharacterCard: React.FC<{ character: Character; onClick: () => void }> = ({ character, onClick }) => {
  return (
    <Card className="bg-dark-secondary hover:bg-opacity-80 transition-colors cursor-pointer" onClick={onClick}>
      <CardContent className="p-4">
        <img src={character.image} alt={character.name_full} className="w-full h-64 object-cover rounded-md mb-4" />
        <h3 className="text-xl font-poppins font-semibold text-purple mb-2">{character.name_full}</h3>
        <p className="text-sm text-gray-300 mb-2">{character.role}</p>
        <p className="text-sm text-gray-400 line-clamp-3">{character.description}</p>
      </CardContent>
    </Card>
  );
};

const CharacterDialog: React.FC<{ character: Character; onClose: () => void }> = ({ character, onClose }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-dark-secondary text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-purple">{character.name_full}</DialogTitle>
          <DialogDescription className="text-gray-300">{character.role}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img src={character.image} alt={character.name_full} className="w-full h-auto rounded-md" />
          <div className="space-y-4">
            <p className="text-sm text-gray-300"><span className="font-semibold">Native Name:</span> {character.name_native}</p>
            {character.age && <p className="text-sm text-gray-300"><span className="font-semibold">Age:</span> {character.age}</p>}
            {character.dateOfBirth && <p className="text-sm text-gray-300"><span className="font-semibold">Date of Birth:</span> {character.dateOfBirth}</p>}
            <p className="text-sm text-gray-300"><span className="font-semibold">Language:</span> {character.languageV2}</p>
            <p className="text-sm text-gray-400">{character.description}</p>
          </div>
        </div>
        <Button onClick={onClose} className="mt-4 bg-purple hover:bg-purple-600 text-white">Close</Button>
      </DialogContent>
    </Dialog>
  );
};

const CharactersLoading: React.FC = () => {
  return (
    <div className="space-y-8">
      <Skeleton className="h-12 w-64 bg-dark-secondary" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="bg-dark-secondary">
            <CardContent className="p-4">
              <Skeleton className="w-full h-64 mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-1" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Characters;
