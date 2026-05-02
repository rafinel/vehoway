import type { ApplicationDto } from '@/core/dtos/application-dto'

export interface ApplicationsCollection {
  getApplications(): Promise<ApplicationDto[]>
}
