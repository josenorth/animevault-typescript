export interface ExternalLink {
  id: number
  anime_id: number
  site_id: number
  url: string
  external_site: ExternalSite
}

export interface ExternalSite {
  id: number
  name: string
  color?: string
  icon?: string
  type: string
  language?: string
  isDisabled: boolean
}
