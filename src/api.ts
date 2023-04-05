import DATA from '@/data.json'
import { type ImpactAssessmentData } from './types'

const api = {
  impactAssessment:{
    list : async (): Promise<ImpactAssessmentData[]> =>
      await Promise.resolve(Object.values(
        DATA.reduce <Record<ImpactAssessmentData['Company Name'], ImpactAssessmentData>>(
          (map, row) => {
            map[row['Company Name']] = row
            return map
          }, {})
      ))
  }
}
// const api = {
//   impactAssessment:{
//     list : async (): Promise<ImpactAssessmentData[]> =>
//       Object.values(
//         DATA.reduce <Record<ImpactAssessmentData['Company Name'], ImpactAssessmentData>>(
//           (map, row) => {
//             map[row['Company Name']] = row
//             return map
//           }, {})
//       )
//   }
// }
export default api
