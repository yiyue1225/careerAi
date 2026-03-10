import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    studentProfile: null as any,
    targetPositionId: null as string | null,
  }),
  actions: {
    setStudentProfile(profile: any) {
      this.studentProfile = profile
    },
    setTargetPosition(id: string) {
      this.targetPositionId = id
    },
  },
})