export interface Details {
    trailers: Trailer[]
    external_links: ExternalLink[]
  }
  
  export interface Trailer {
    id: number
    anime_id: number
    trailer_id: string
    site: string
    thumbnail: string
  }
  
  export interface ExternalLink {
    id: number
    anime_id: number
    site_id: number
    url: string
    type: string
    language?: string
    notes?: string
    isDisabled: boolean
    site: Site
  }
  
  export interface Site {
    id: number
    name: string
    color?: string
    icon?: string
  }
  