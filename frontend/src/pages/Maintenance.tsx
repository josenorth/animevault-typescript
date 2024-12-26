import { Card, CardContent } from "@/components/ui/card"
import { CircularProgress } from "@mui/material"
import Image from "next/image"

export default function Maintenance() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex flex-col items-center space-y-6 p-6">
          <Image
            src="/placeholder.svg?height=100&width=100"
            alt="Anime Vault Logo"
            width={100}
            height={100}
            className="rounded-full"
          />
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
            Anime Vault
          </h1>
          <CircularProgress color="secondary" />
          <p className="text-center text-gray-600 dark:text-gray-300">
            We're currently performing some maintenance on our site. We'll be back soon!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}