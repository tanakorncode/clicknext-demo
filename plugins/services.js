import { AuthService } from "~/core/services"

export default ({ $axios }, inject) => {
  inject('authService', AuthService($axios))
}
