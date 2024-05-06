import sanityClient, { SanityClient } from '@sanity/client'
import { createClient } from '@sanity/client'

export const client = SanityClient({
    projectId: "ehi8qumr",
    dataset: "production",
    useCdn: true,
    apiVersion: "2022-03-07"
    
})
