import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

interface ErrorPageProps {
  errorType: 404 | 403;
}

export default function ErrorPage({ errorType }: ErrorPageProps) {
  const errorMessages = {
    404: {
      title: "Oops!",
      description: "We can't seem to find the page you're looking for.",
      imageSrc: "/img/frieren-404.svg", // Ruta de la imagen para error 404
      imageClass: "brightness-90", // Clase de estilo específica para 404
    },
    403: {
      title: "Forbidden",
      description: "You don't have permission to access this page.",
      imageSrc: "/img/frieren-403.svg", // Ruta de la imagen para error 403
      imageClass: "m-0 sm:m-8 sm:mt-16 brightness-75 contrast-125",

    },
  };

  const { title, description, imageSrc, imageClass } = errorMessages[errorType];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-900">
      <div className="container flex flex-col lg:flex-row items-center justify-center gap-8 px-4 max-w-6xl bg-gray-800 pt-8 rounded-lg">
        <div className="flex flex-col items-center lg:items-start space-y-4 text-center lg:text-left pb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-purple-400">{title}</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-purple-400">{description}</p>
          <p className="text-gray-200 font-bold text-base sm:text-lg">Error code: {errorType}</p>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            href="/"
            className="gap-2 !bg-purple-400 !hover:bg-purple-900"
          >
            Back to Home
          </Button>
        </div>
        <div className="relative w-full max-w-sm lg:max-w-md aspect-square">
          <img
            src={imageSrc}
            alt={`Error ${errorType} Illustration`}
            className={`w-full h-auto ${imageClass}`} // Asegúrate de que la imagen sea responsiva
          />
        </div>
      </div>
    </div>
  );
}
