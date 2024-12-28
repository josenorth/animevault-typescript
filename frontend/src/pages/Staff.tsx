import { useParams } from 'react-router-dom';
import { useAnimeStaff } from '@/services/anime/useStaffById';
import { useAnimeStaffWork } from '@/services/anime/useStaffWorkById';
import { Staff } from '@/types/staff/Staff';
import { StaffWork } from '@/types/staff/StaffWork';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarIcon, MapPinIcon, CakeIcon, UserIcon, BriefcaseIcon } from 'lucide-react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Para soportar enlaces y estilos avanzados
import remarkBreaks from 'remark-breaks'
import { GiBodyHeight } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const StaffPage: React.FC = () => {
    const { id_staff } = useParams<{ id_staff: string }>();
    const navigate = useNavigate();
    const idStaff = parseInt(id_staff!, 10);
    const { data: staff, isLoading: loadingStaff, error: errorStaff } = useAnimeStaff(idStaff);
    const { data: works, isLoading: loadingWorks, error: errorWorks } = useAnimeStaffWork(idStaff);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(() => {
        // Si el staff está disponible, actualiza la URL para incluir el nombre
        if (staff) {
            const nameSlug = staff.name_full.replace(/\s+/g, '-').toLowerCase(); // Crear un slug basado en el nombre
            navigate(`/staff/${idStaff}/${nameSlug}`, { replace: true });
        }
    }, [staff, idStaff, navigate]);

    if (loadingStaff || loadingWorks) return <StaffDetailLoading />;
    if (errorStaff || errorWorks) return <div className="text-center text-red-500">Error loading information</div>;
    if (!staff) return <div className="text-center">No staff information found</div>;

    // Group works by year
    const worksByYear = works?.reduce((acc: Record<string, StaffWork[]>, work) => {
        const year = work.seasonYear?.toString() || 'Unknown';
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(work);
        return acc;
    }, {}) || {};

    const extractHeight = (description: string | null): string | null => {
        // Verificar si la descripción no es nula ni vacía
        if (!description) {
          return null;
        }
      
        const heightMatch = description.match(/__Height:__\s*(\d+\s*cm\s*\(\d+'\d+''\))/i);
        return heightMatch ? heightMatch[1] : null;
      };

      const height = staff && staff.description ? extractHeight(staff.description) : null;

    // Sort years in descending order
    const sortedYears = Object.keys(worksByYear).sort((a, b) => b.localeCompare(a));

    return (
        <div className="container mx-auto px-4 py-8 bg-[#111827] text-white min-h-screen">
            <Card className="bg-[#1F2937] shadow-xl mb-8">
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1 bg-[#111827] p-6">
                            <div className="aspect-w-9 aspect-h-16 mb-6">
                                <img
                                    src={staff.image}
                                    alt={staff.name_full}
                                    className="object-cover rounded-lg shadow-md"
                                />
                            </div>
                            <h1 className="text-2xl font-heading font-bold text-[#C084FC] mb-2">{staff.name_full}</h1>
                            <p className="text-lg text-gray-300 mb-4">{staff.primaryOccupations.join(', ')}</p>
                            <p className="text-sm text-gray-400 mb-6">{staff.name_native}</p>
                            <div className="space-y-3">
                                <InfoItem icon={<UserIcon className="h-5 w-5" />} label="Gender" value={staff.gender} />
                                {staff.dateOfBirth && <InfoItem icon={<CakeIcon className="h-5 w-5" />} label="Birthday" value={staff.dateOfBirth} />}
                                {staff.age && <InfoItem icon={<CalendarIcon className="h-5 w-5" />} label="Age" value={staff.age.toString()} />}
                                <InfoItem icon={<BriefcaseIcon className="h-5 w-5" />} label="Years Active" value={staff.yearsActive.join(' - ')} />
                                <InfoItem icon={<MapPinIcon className="h-5 w-5" />} label="Home Town" value={staff.homeTown} />
                                {height && <InfoItem icon={<GiBodyHeight className="h-5 w-5" />} label="Height" value={height} />}

                            </div>
                        </div>
                        <div className="md:col-span-2 p-6">
                            <h2 className="text-xl font-heading font-semibold text-[#C084FC] mb-4">Biography</h2>
                            <DescriptionCard description={staff.description} />

                            {/* Notable Works Section */}
                            <h2 className="text-xl font-heading font-semibold text-[#C084FC] mb-4">Notable Works</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {staff.notableWorks?.map((work, index) => (
                                    <Card key={index} className="bg-[#111827]">
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold text-[#C084FC] mb-2">{work.title}</h3>
                                            <p className="text-sm text-gray-400">{work.role}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Works Section */}
                            {/* Works Section */}
                            <div className="space-y-8">
                                {sortedYears.map((year) => (
                                    <div key={year} className="space-y-4">
                                        <h2 className="text-2xl font-heading font-bold text-[#C084FC]">{year}</h2>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                                            {worksByYear[year].map((work, index) => (
                                                <div key={index} className="flex flex-col items-stretch">
                                                    {/* Card Section */}
                                                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                                                        {/* Main Character Image */}
                                                        <img
                                                            src={work.character_image}
                                                            alt={work.character_name}
                                                            className="w-full h-full object-cover"
                                                        />

                                                        {/* Anime Cover (bottom right) */}
                                                        <div className="absolute bottom-2 right-2 w-12 h-16 rounded overflow-hidden shadow-lg">
                                                            <img
                                                                src={work.anime_cover}
                                                                alt={work.anime_romaji}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Text Section */}
                                                    <div className="mt-2 p-2 bg-[#1F2937] rounded-b-lg">
                                                        <h3 className="text-sm font-semibold text-white mb-0.5 line-clamp-1">
                                                            {work.character_name}
                                                        </h3>
                                                        <p className="text-xs text-gray-300 mb-0.5">
                                                            {work.role || 'Voice Actor'}
                                                        </p>
                                                        <p className="text-xs text-[#C084FC]">
                                                            {work.anime_english || work.anime_romaji}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const DescriptionCard: React.FC<{ description: string }> = ({ description }) => {


    if (!description) {
        return null; // O puedes mostrar un mensaje de error o contenido alternativo
      }

    // Eliminar la línea que contiene la altura (__Height:__)
    const cleanedDescription = description.replace(/__Height:__.*?(\n|$)/, '');
  
    // Reemplazar los enlaces de Anilist con localhost:5173
    const finalDescription = cleanedDescription.replace(
        /https:\/\/anilist\.co\/staff\/(\d+)(?:\/([A-Za-z0-9-]+))?/g,
        'http://localhost:5173/staff/$1/$2'
      );
  
    return (
      <div className="text-gray-300 leading-relaxed mb-8">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={{
            p: ({ node, ...props }) => <p className="mb-2" {...props} />,
            a: ({ href, children, ...props }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C084FC] hover:underline" // Cambia el color de los links externos
                {...props}
              >
                {children}
              </a>
            ),
          }}
        >
          {finalDescription}
        </ReactMarkdown>
      </div>
    );
  };
  


const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-center text-sm">
        <span className="text-[#C084FC] mr-2">{icon}</span>
        <span className="text-gray-400 mr-2">{label}:</span>
        <span className="text-white">{value}</span>
    </div>
);

const StaffDetailLoading: React.FC = () => (
    <div className="container mx-auto px-4 py-8 bg-[#111827]">
        <Card className="bg-[#1F2937] shadow-xl mb-8">
            <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 bg-[#111827] p-6">
                        <Skeleton className="aspect-w-9 aspect-h-16 mb-6 rounded-lg" />
                        <Skeleton className="h-8 w-3/4 mb-2" />
                        <Skeleton className="h-6 w-1/2 mb-4" />
                        <Skeleton className="h-4 w-1/3 mb-6" />
                        <div className="space-y-3">
                            {[...Array(5)].map((_, index) => (
                                <Skeleton key={index} className="h-5 w-full" />
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-2 p-6">
                        <Skeleton className="h-8 w-1/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-8" />
                        <Skeleton className="h-8 w-1/4 mb-4" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[...Array(4)].map((_, index) => (
                                <Skeleton key={index} className="h-24 w-full rounded" />
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Works Loading State */}
        <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[...Array(10)].map((_, index) => (
                    <Skeleton key={index} className="aspect-[3/4] rounded-lg" />
                ))}
            </div>
        </div>
    </div>
);

export default StaffPage;

