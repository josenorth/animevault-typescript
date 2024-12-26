// import React, { useState, useEffect } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Chip, Rating, LinearProgress, Box, Typography } from '@mui/material'
// import { Search, Bell, Menu, PlayCircle, Star, TrendingUp, Calendar, BookOpen, Clock } from 'lucide-react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import AiringScheduleComponent from './anime/AiringSchedule'


// import { useTrendingAnimes } from '../services/anime/Trending'; // Importamos el hook de React Query


// export default function HomePage() {
//   const [menuOpen, setMenuOpen] = useState(false)


//   const { data: trendingAnime } = useTrendingAnimes();

//   const featuredAnime = {
//     title: "Dan Da Dan",
//     description: "DAN DA DAN follows Momo, a high school girl from a family of spirit mediums, and her classmate Okarun, an occult freak.",
//     images: [
//       "/img/index/dandadan-anime-momo-okarun-ufo-ghost-4k-wallpaper-uhdpaper.com-66@2@b.jpg",
//       "/img/index/dandadan-anime-momo-okarun-4k-wallpaper-uhdpaper.com-65@2@b.jpg",
//       "/img/index/dandadan-anime-characters-4k-wallpaper-uhdpaper.com-67@2@b.jpg"
//     ],
//     rating: 9.1,
//   };
//   const customLoader = ({ src }: { src: string }) => {
//     return src;
//   };
  

//   const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life"]

//   const topRatedAnime = [
//     { id: 1, title: "Fullmetal Alchemist: Brotherhood", rating: 9.1, votes: 1500000 },
//     { id: 2, title: "Steins;Gate", rating: 9.0, votes: 1000000 },
//     { id: 3, title: "Gintama", rating: 8.9, votes: 800000 },
//     { id: 4, title: "Hunter x Hunter (2011)", rating: 9.0, votes: 950000 },
//     { id: 5, title: "Death Note", rating: 8.6, votes: 2000000 },
//   ]

//   const seasonalAnime = [
//     { id: 1, title: "Demon Slayer: Kimetsu no Yaiba - Swordsmith Village Arc", image: "/placeholder.svg?height=400&width=300", status: "Currently Airing" },
//     { id: 2, title: "My Hero Academia Season 6", image: "/placeholder.svg?height=400&width=300", status: "Currently Airing" },
//     { id: 3, title: "Attack on Titan: The Final Season - Part 3", image: "/placeholder.svg?height=400&width=300", status: "Upcoming" },
//     { id: 4, title: "Oshi no Ko", image: "/placeholder.svg?height=400&width=300", status: "Currently Airing" },
//     { id: 5, title: "Mashle: Magic and Muscles", image: "/placeholder.svg?height=400&width=300", status: "Currently Airing" },
//     { id: 6, title: "Hell's Paradise", image: "/placeholder.svg?height=400&width=300", status: "Currently Airing" },
//   ]
//   const [currentImage, setCurrentImage] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % featuredAnime.images.length);
//     }, 3000); // Cambiar cada 3 segundos

//     return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#111827] text-white">

//       <main className="container mx-auto px-4 py-8">
//         {/* Hero Section */}
//         <section className="relative mb-12 rounded-lg overflow-hidden">
//       <div className="relative w-full h-[60vh]">
//         {/* Mapear las imágenes con opacidad y transición */}
//         {featuredAnime.images.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Hero Image ${index + 1}`}
//             className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
//               currentImage === index ? 'opacity-100' : 'opacity-0'
//             }`}
//           />
//         ))}
//       </div>

//       <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//       <div className="absolute bottom-0 left-0 p-8">
//         <h1 className="text-4xl font-bold mb-2">{featuredAnime.title}</h1>
//         <p className="text-lg mb-4">{featuredAnime.description}</p>
//         <div className="flex items-center space-x-4">
//           <Button className="bg-[#C084FC] text-white hover:bg-[#C084FC]/90">
//             <PlayCircle className="mr-2 h-4 w-4" />
//             <a href="https://www.crunchyroll.com/es/series/GG5H5XQ0D/dan-da-dan">Watch Now</a>
//           </Button>
//           <div className="flex items-center">
//             <Star className="text-yellow-400 mr-1" />
//             <span className="font-semibold">{featuredAnime.rating}</span>
//           </div>
//         </div>
//       </div>
//     </section>

//     <section className="mb-12">
//   <h2 className="text-2xl font-bold mb-4 text-[#C084FC]">Trending Now</h2>
//   <ScrollArea>
//     <SkeletonTheme baseColor="#1F2937" highlightColor="rgba(192, 132, 252, 0.2)">
//       <div className="flex gap-x-4 w-full pb-4 justify-between">
//         {trendingAnime ? (
//           trendingAnime.map((anime) => (
//             <Card key={anime.id} className="w-full sm:w-[250px] md:w-[250px] lg:w-[250px] flex-shrink-0 bg-[#111827] text-white border-none">
//               <CardHeader className="p-0">
//                 <Image
//                   src={anime.image_url}
//                   alt={anime.title_english || anime.title_romaji}
//                   width={250}
//                   height={375}
//                   className="w-full h-[375px] object-cover rounded-t-lg"
//                   loader={customLoader}
//                 />
//               </CardHeader>
//               <CardContent className="p-4 bg-[#1F2937]">
//                 <CardTitle className="text-lg mb-2">{anime.title_english || anime.title_romaji}</CardTitle>
//                 <div className="flex items-center">
//                   <Star className="text-yellow-400 mr-1 h-4 w-4" />
//                   <span>{anime.average_score ?? 'N/A'}</span>
//                 </div>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           // Mostrar el esqueleto mientras se cargan los datos
//           Array.from({ length: 5 }).map((_, index) => (
//             <Card key={index} className="w-full sm:w-[250px] md:w-[250px] lg:w-[250px] flex-shrink-0 bg-[#111827] text-white border-none">
//               <CardHeader className="p-0">
//                 <Skeleton height={375} />
//               </CardHeader>
//               <CardContent className="p-4 bg-[#1F2937]">
//                 <Skeleton count={2} />
//               </CardContent>
//             </Card>
//           ))
//         )}
//       </div>
//       <ScrollBar orientation="horizontal" />
//     </SkeletonTheme>
//   </ScrollArea>
// </section>

//         {/* Genre Quick Filters */}
//         <section className="mb-12">
//   <h2 className="text-2xl font-bold mb-4 text-[#C084FC]">Explore by Genre</h2>
//   <div className="flex flex-wrap gap-2">
//     {genres.map((genre) => (
//       <Chip
//         key={genre}
//         label={genre}
//         onClick={() => { }}
//         sx={{
//           backgroundColor: '#C084FC', // Color de fondo
//           color: 'white',              // Color del texto
//           '&:hover': {
//             backgroundColor: '#C084FC', // Color de fondo al hacer hover
//             opacity: 0.9,               // Opcional, opacidad en hover
//           },
//         }}
//       />
//     ))}
//   </div>
// </section>

//         {/* Latest Releases */}
//        <AiringScheduleComponent />

//         {/* Top Rated Anime */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-bold mb-4 text-[#C084FC]">Top Rated Anime</h2>
//           <div className="grid gap-4">
//             {topRatedAnime.map((anime) => (
//               <Card key={anime.id} className="bg-[#111827] text-white">
//                 <CardContent className="p-4 flex items-center justify-between">
//                   <div>
//                     <CardTitle className="text-lg mb-2">{anime.title}</CardTitle>
//                     <div className="flex items-center">
//                       <Rating value={anime.rating / 2} precision={0.1} readOnly />
//                       <span className="ml-2 text-sm text-muted-foreground">
//                         {anime.rating} ({anime.votes.toLocaleString()} votes)
//                       </span>
//                     </div>
//                   </div>
//                   <Box sx={{ width: '100px' }}>
//                     <LinearProgress
//                       variant="determinate"
//                       value={(anime.rating / 10) * 100}
//                       sx={{
//                         height: 10,
//                         borderRadius: 5,
//                         backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                         '& .MuiLinearProgress-bar': {
//                           borderRadius: 5,
//                           backgroundColor: '#C084FC',
//                         },
//                       }}
//                     />
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* Seasonal Anime */}
//         <section className="mb-8 bg-[#111827] rounded-lg">
//           <h2 className="text-2xl font-bold mb-4 text-[#C084FC]">Seasonal Anime</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//             {seasonalAnime.map((anime) => (
//               <Card key={anime.id} className="bg-[#111827] text-white">
//                 <CardHeader className="p-0">
//                   <Image
//                     src={anime.image}
//                     alt={anime.title}
//                     width={300}
//                     height={400}
//                     className="w-full h-[250px] object-cover rounded-t-lg"
//                   />
//                 </CardHeader>
//                 <CardContent className="p-4">
//                   <CardTitle className="text-sm mb-2">{anime.title}</CardTitle>
//                   <Badge variant={anime.status === "Currently Airing" ? "default" : "secondary"} className="bg-[#C084FC] text-white">
//                     {anime.status}
//                   </Badge>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </section>

//       </main>
//     </div>
//   )
// }