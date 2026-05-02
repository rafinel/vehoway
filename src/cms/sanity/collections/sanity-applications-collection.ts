import type { SanityClient } from 'sanity'

import type { ApplicationDto } from '@/core/dtos/application-dto'
import type { ApplicationsCollection } from '@/core/interfaces/applications-collection'

export const SanityApplicationsCollection = (
  sanity: SanityClient,
): ApplicationsCollection => {
  return {
    getApplications: async () => {
      return await sanity.fetch<ApplicationDto[]>(`
        *[_type == "application" && !(_id in path("drafts.**"))] | order(name asc) {
          "id": _id,
          name
        }
      `)
    },
  }
}
