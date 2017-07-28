export default interface DeployConfig {
  tiers?: Array<string>
  targetTier: string
  previousTier?: string
  sprintSchedule: string
  sprintName?: string
}
