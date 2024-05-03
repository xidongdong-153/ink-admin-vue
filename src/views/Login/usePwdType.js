import { ref } from 'vue'

export function usePwdType() {
  const pwdType = ref('password')
  const pwdTypeIcon = ref('eye')

  const onChangePwdType = (type) => {
    if (pwdType.value === 'password') {
      pwdType.value = 'text'
      pwdTypeIcon.value = 'eye-open'
    } else {
      pwdType.value = 'password'
      pwdTypeIcon.value = 'eye'
    }
  }

  return {
    pwdType,
    pwdTypeIcon,
    onChangePwdType,
  }
}
