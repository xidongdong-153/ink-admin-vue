<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="login-lang-select" :effect="'light'" />
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="username"
          name="username"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.password"
          :type="pwdType"
          placeholder="password"
          name="password"
        />
        <span class="show-pwd" @click="onChangePwdType">
          <svg-icon :icon="pwdTypeIcon"></svg-icon>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        :loading="loginLoading"
        @click="handleLogin"
        style="width: 100%; margin-bottom: 30px"
      >
        {{ $t('msg.login.loginBtn') }}
      </el-button>
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import LangSelect from '@/components/LangSelect/LangSelect'
import { validatePassword } from '@/views/Login/rules'
import { useLogin } from '@/views/Login/useLogin'
import { usePwdType } from '@/views/Login/usePwdType'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const loginForm = ref({
  username: 'super-admin',
  password: '123456',
})

const i18n = useI18n()

const loginRules = ref({
  username: [
    {
      required: true,
      message: i18n.t('msg.login.usernameRule'),
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: i18n.t('msg.login.passwordRule'),
      trigger: 'blur',
      validator: validatePassword(),
    },
  ],
})

const loginFormRef = ref(null)

const { pwdType, pwdTypeIcon, onChangePwdType } = usePwdType()
const { loginLoading, handleLogin } = useLogin({
  loginForm,
  loginFormRef,
})
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .tips {
      font-size: 16px;
      color: #fff;
      line-height: 24px;
    }

    .login-lang-select {
      position: absolute;
      top: 4px;
      right: 0px;
      padding: 4px;
      background: #fff;
      font-size: 22px;
      border-radius: 4px;
    }

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input__wrapper) {
      background: transparent;
      box-shadow: none;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    display: flex;
    align-items: center;
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
