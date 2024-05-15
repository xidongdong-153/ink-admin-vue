import permission from '@/directives/permission'
import print from 'vue3-print-nb'

export default (app) => {
  app.use(print)
  app.directive('permission', permission)
}
