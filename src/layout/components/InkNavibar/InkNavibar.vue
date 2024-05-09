<template>
  <div class="navbar">
    <div>
      <hamburger-icon class="hamburger-container" />
      <breadcrumb-path id="guide-breadcrumb" class="breadcrumb-container" />
    </div>
    <div class="right-menu">
      <header-search class="right-menu-item hover-effect"></header-search>
      <guide class="right-menu-item hover-effect" />
      <screenfull class="right-menu-item hover-effect" />
      <theme-picker class="right-menu-item hover-effect"></theme-picker>
      <lang-select class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="store.getters['user/userInfo'].avatar"
          ></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>

        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{ $t('msg.navBar.home') }} </el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              {{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import BreadcrumbPath from '@/components/Breadcrumb/BreadcrumbPath'
import Guide from '@/components/Guide/GuideCom'
import HamburgerIcon from '@/components/HamburgerIcon/HamburgerIcon'
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch'
import LangSelect from '@/components/LangSelect/LangSelect'
import Screenfull from '@/components/Screenfull/ScreenfullCom'
import ThemePicker from '@/components/ThemeSelect/ThemeSelect'
import store from '@/store'

const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .right-menu {
    display: flex;
    align-items: center;

    padding-right: 16px;

    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }

    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
