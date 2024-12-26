import React, { useEffect, useState } from 'react';
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import { Link } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import '../css/filter-anime.css';
import "../css/anime.css";

interface FilterAnimeProps {
    onSearchResults: (results: any[]) => void; // Cambia `any[]` por el tipo adecuado según tu estructura de datos
}

const FilterAnime: React.FC<FilterAnimeProps> = ({ onSearchResults }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string>('Any');
    const [years, setYears] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>('Any');
    const [seasons, setSeasons] = useState<[string, string][]>([]); // Asumiendo que es un array de tuplas con [id, nombre]
    const [selectedSeason, setSelectedSeason] = useState<string>('Any');
    const [formats, setFormats] = useState<string[]>([]);
    const [selectedFormat, setSelectedFormat] = useState<string>('Any');
    const [airingStatuses, setAiringStatuses] = useState<string[]>([]);
    const [selectedAiringStatus, setSelectedAiringStatus] = useState<string>('Any');

    useEffect(() => {
        // Cargar datos iniciales
        const fetchFiltersData = async () => {
            const response = await fetch('/api/animes/filters'); // Suponiendo que este endpoint devuelve todos los datos de filtros necesarios
            const data = await response.json();
            setGenres(data.genres);
            setYears(data.years);
            setSeasons(data.seasons);
            setFormats(data.formats);
            const extractedStatuses = data.airingStatuses.map((statusArray: string[]) => statusArray[0]);
            setAiringStatuses(extractedStatuses);
        };

        fetchFiltersData();
    }, []);

    useEffect(() => {
        // Obtener parámetros de búsqueda de la URL
        const params = new URLSearchParams(window.location.search);
        const search = params.get('search') || '';
        const genre = params.get('genres') || 'Any';
        const selectedYear = params.get('year') || 'Any';
        const selectedSeason = params.get('season') || 'Any';
        const selectedFormat = params.get('format') || 'Any';
        const selectedStatus = params.get('airing_status') || 'Any';

        // Actualizar los estados con los parámetros obtenidos
        setSearchQuery(search);
        setSelectedGenre(genre);
        setSelectedYear(selectedYear);
        setSelectedSeason(selectedSeason);
        setSelectedFormat(selectedFormat);
        setSelectedAiringStatus(selectedStatus);

        // Realizar la búsqueda inicial si hay parámetros
        if (search || genre !== 'Any' || selectedYear !== 'Any' || selectedSeason !== 'Any' || selectedFormat !== 'Any' || selectedStatus !== 'Any') {
            updateUrl(search, genre, selectedYear, selectedSeason, selectedFormat, selectedStatus);
        }
    }, []);

    let debounceTimer: ReturnType<typeof setTimeout>; // Asegúrate de que el temporizador tenga un tipo

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            updateUrl(query);
        }, 300);
    };

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const genre = event.target.value;
        setSelectedGenre(genre);
        updateUrl(searchQuery, genre);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const year = event.target.value;
        setSelectedYear(year);
        updateUrl(searchQuery, undefined, year);
    };

    const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const season = event.target.value;
        setSelectedSeason(season);
        updateUrl(searchQuery, undefined, undefined, season);
    };

    const handleFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const format = event.target.value;
        setSelectedFormat(format);
        updateUrl(searchQuery, undefined, undefined, undefined, format);
    };

    const handleAiringStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const status = event.target.value;
        setSelectedAiringStatus(status);
        updateUrl(searchQuery, undefined, undefined, undefined, undefined, status);
    };

    const updateUrl = async (
        query: string,
        genre?: string,
        selectedYear?: string,
        selectedSeason?: string,
        selectedFormat?: string,
        selectedStatus?: string
    ) => {
        const params = new URLSearchParams();
        if (query) params.set('search', query);
        if (genre && genre !== 'Any') params.set('genres', genre);
        if (selectedYear && selectedYear !== 'Any') params.set('year', selectedYear);
        if (selectedSeason && selectedSeason !== 'Any') params.set('season', selectedSeason.toUpperCase());
        if (selectedFormat && selectedFormat !== 'Any') params.set('format', selectedFormat);
        if (selectedStatus && selectedStatus !== 'Any') params.set('airing_status', selectedStatus);

        const newUrl = `/search/anime${params.toString() ? '?' + params.toString() : ''}`;
        window.history.pushState({}, '', newUrl);

        await performSearch(params.toString());
    };

    const performSearch = async (queryString: string) => {
        const limit = 50;
        const response = await fetch(`/api/animes/search?${queryString}&limit=${limit}`);

        if (response.ok) {
            const results = await response.json();
            onSearchResults(results); // Actualiza los resultados en el componente padre
        } else {
            console.error('Error en la búsqueda:', response.statusText);
            onSearchResults([]); // Si hay un error, pasa un arreglo vacío
        }
    };

    // const showResults = searchQuery || selectedGenre !== 'Any' || selectedYear !== 'Any' || selectedSeason !== 'Any' || selectedFormat !== 'Any' || selectedAiringStatus !== 'Any';

    return (
        <div className="custom-container mx-auto p-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-6 ">
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-white">Search</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#C084FC]"
                        id="search"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div>
                    <label htmlFor="genres" className="block text-sm font-medium text-white">Genres</label>
                    <select
                        className="mt-1 block w-full p-2 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#C084FC]"
                        id="genres"
                        value={selectedGenre}
                        onChange={handleGenreChange}
                    >
                        <option value="Any">Any</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.name}>{genre.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="year" className="block text-sm font-medium text-white">Year</label>
                    <select
                        className="mt-1 block w-full p-2 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#C084FC]"
                        id="year"
                        value={selectedYear}
                        onChange={handleYearChange}
                    >
                        <option value="Any">Any</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="season" className="block text-sm font-medium text-white">Season</label>
                    <select
                        className="mt-1 block w-full p-2 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#C084FC]"
                        id="season"
                        value={selectedSeason}
                        onChange={handleSeasonChange}
                    >
                        <option value="Any">Any</option>
                        {seasons.map(season => (
                            <option key={season[0]} value={season[1]}>{season[1]}</option> // Acceder al nombre de la temporada
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="format" className="block text-sm font-medium text-white">Format</label>
                    <select
                        className="mt-1 block w-full p-2 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#C084FC]"
                        id="format"
                        value={selectedFormat}
                        onChange={handleFormatChange}
                    >
                        <option value="Any">Any</option>
                        {formats.map(format => (
                            <option key={format} value={format}>{format}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="airingStatus" className="block text-sm font-medium text-white">Airing Status</label>
                    <select
                        className="mt-1 block w-full p-2 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#C084FC]"
                        id="airingStatus"
                        value={selectedAiringStatus}
                        onChange={handleAiringStatusChange}
                    >
                        <option value="Any">Any</option>
                        {airingStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterAnime;
