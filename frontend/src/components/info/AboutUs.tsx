import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Database, Search, Star, TrendingUp, MessageSquare } from 'lucide-react'

export default function AboutUs() {
  const features = [
    { icon: <Database className="h-6 w-6" />, title: 'Extensive Database', description: 'Access a vast collection of anime and manga titles, complete with detailed information and metadata.' },
    { icon: <Search className="h-6 w-6" />, title: 'Advanced Search', description: 'Find exactly what you\'re looking for with our powerful search and filtering capabilities.' },
    { icon: <Star className="h-6 w-6" />, title: 'Personalized Recommendations', description: 'Discover new anime and manga tailored to your tastes with our smart recommendation engine.' },
    { icon: <TrendingUp className="h-6 w-6" />, title: 'Trending Analytics', description: 'Stay up-to-date with what\'s popular in the anime and manga world with real-time trending data.' },
    { icon: <Users className="h-6 w-6" />, title: 'Community Features', description: 'Connect with fellow fans, join discussions, and share your thoughts on your favorite series.' },
    { icon: <MessageSquare className="h-6 w-6" />, title: 'Reviews and Ratings', description: 'Read and contribute to user reviews and ratings to help others find great content.' },
  ]

  const teamMembers = [
    { name: 'Yuki Tanaka', role: 'Founder & CEO', image: '/placeholder.svg' },
    { name: 'Alex Johnson', role: 'Lead Developer', image: '/placeholder.svg' },
    { name: 'Maria Garcia', role: 'UX Designer', image: '/placeholder.svg' },
    { name: 'Hiroshi Nakamura', role: 'Content Manager', image: '/placeholder.svg' },
  ]

  const stats = [
    { label: 'Anime Titles', value: '15,000+' },
    { label: 'Manga Series', value: '10,000+' },
    { label: 'Active Users', value: '1M+' },
    { label: 'Reviews', value: '5M+' },
  ]

  const customLoader = ({ src }: { src: string }) => {
    return src;
  };
  
  const popularGenres = [
    { name: 'Action', image: '/img/joker.jpeg', description: 'High-energy adventures and thrilling combat scenes.' },
    { name: 'Romance', image: '/placeholder.svg', description: 'Heart-warming tales of love and relationships.' },
    { name: 'Sci-Fi', image: '/placeholder.svg', description: 'Futuristic worlds and mind-bending technologies.' },
    { name: 'Fantasy', image: '/placeholder.svg', description: 'Magical realms and mythical creatures.' },
    { name: 'Comedy', image: '/placeholder.svg', description: 'Laugh-out-loud humor and witty narratives.' },
    { name: 'Horror', image: '/placeholder.svg', description: 'Spine-chilling stories and supernatural encounters.' },
    { name: 'Slice of Life', image: '/placeholder.svg', description: 'Everyday experiences and relatable characters.' },
    { name: 'Mecha', image: '/placeholder.svg', description: 'Giant robots and futuristic warfare.' },
    { name: 'Sports', image: '/placeholder.svg', description: 'Competitive athletics and team dynamics.' },
    { name: 'Mystery', image: '/placeholder.svg', description: 'Intriguing puzzles and detective stories.' },
  ];


  const faqs = [
    { question: 'How often is the database updated?', answer: 'Our database is updated daily with new releases, ensuring you always have access to the latest information.' },
    { question: 'Can I contribute to the site?', answer: 'We welcome user contributions in the form of reviews, ratings, and forum discussions. For content additions or corrections, please contact our moderation team.' },
    { question: 'Is there a mobile app available?', answer: 'Yes, we offer mobile apps for both iOS and Android platforms, providing a seamless experience across all your devices.' },
    { question: 'How does the recommendation system work?', answer: 'Our recommendation system uses a combination of your viewing history, ratings, and machine learning algorithms to suggest anime and manga you\'re likely to enjoy.' },
  ]

   return (
    <div className="min-h-screen bg-white text-[#111827]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#111827]">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
              Welcome to <span className="text-[#C084FC]">AnimeVault</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Your ultimate destination for discovering, tracking, and discussing anime and manga.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1F2937] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-300">
            At AnimeMetadata, we're passionate about connecting fans with the anime and manga they love. Our mission is to provide the most comprehensive, user-friendly platform for exploring the vast world of Japanese animation and comics.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#111827]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[#C084FC] text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-[#1F2937] text-white border border-[#C084FC]">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-[#C084FC] rounded-full text-white">
                        {feature.icon}
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1F2937] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-300">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#111827]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-extrabold text-[#C084FC]">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-[#C084FC]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Genres */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1F2937] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12">Popular Genres</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {popularGenres.map((genre, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="bg-[#1F2937] text-white overflow-hidden border-none">
                  <CardHeader className="p-0">
                    <div className="relative h-40">
                      <Image
                        src={genre.image}
                        alt={genre.name}
                        layout="fill"
                        objectFit="cover"
                        loader={customLoader} // Usa el loader personalizado aquí
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h3 className="text-white text-xl font-bold">{genre.name}</h3>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-300">{genre.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#111827]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[#C084FC] text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-foreground/10">
                <AccordionTrigger className="text-[#C084FC]">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-gray-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#C084FC] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4 text-white">Ready to dive into the world of anime and manga?</h2>
          <p className="text-lg mb-8 text-white">Join our community today and start exploring!</p>
          <Button size="lg" className="bg-[#111827] text-white hover:bg-[#1F2937]/90">
            <a href="/register">Sign Up Now</a>
          </Button>
        </div>
      </section>
    </div>
  )
}