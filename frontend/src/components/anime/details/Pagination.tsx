import React from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  charactersPerPage: number
  totalCharacters: number
  paginate: (pageNumber: number) => void
  currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({
  charactersPerPage,
  totalCharacters,
  paginate,
  currentPage
}) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalCharacters / charactersPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className="flex justify-center items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => paginate(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="bg-[#1F2937] text-white hover:bg-[#C084FC] hover:!text-white"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          variant={currentPage === number ? "default" : "outline"}
          size="icon"
          onClick={() => paginate(number)}
          className={currentPage === number ? "bg-[#C084FC] !text-white" : "bg-[#1F2937] !text-white hover:bg-[#C084FC]"}
        >
          {number}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={() => paginate(Math.min(pageNumbers.length, currentPage + 1))}
        disabled={currentPage === pageNumbers.length}
        className="bg-[#1F2937] !text-white hover:!bg-[#C084FC] hover:!text-white"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}

export default Pagination

