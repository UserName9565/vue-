<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="sidebar">
        <el-menu
          class="sidebar-el-menu"
          :default-active="onRoutes"
          :collapse="isCollapse"
          background-color="#1a2634"
          text-color="#bfcbd9"
          active-text-color="#20a0ff"
          unique-opened
          router
        >
          <template v-for="item in menu">
            <template v-if="item.subMenus">
              <el-submenu :key="item.path||item.idl" :index="item.path||item.id">
                <template slot="title">

                  <i :class="item.css" />

                  <span slot="title">{{ item.name }}</span>
                </template>
                <template v-for="subItem in item.subMenus">
                  <el-submenu v-if="subItem.subMenus" :key="subItem.path||subItem.id" :index="subItem.path||subItem.id">
                    <template slot="title">{{ subItem.name }}</template>
                    <el-menu-item v-for="(threeItem,i) in subItem.subMenus" :key="threeItem.path||threeItem.id" :index="threeItem.path||threeItem.id">
                      {{ threeItem.name }}
                    </el-menu-item>
                  </el-submenu>
                  <el-menu-item v-else :key="subItem.url||subItem.id" :index="subItem.url||subItem.id">
                    {{ subItem.name }}
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :key="item.url" :index="item.url">
                <i :class="item.css" /><span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
// import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { getMenus } from '@/api/user'
export default {
  components: { Logo },
  data() {
    return {
      menu: []
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    this.doSearch()
  },
  methods: {
    onRoutes() {
      return this.$route.path.replace('/', '')
    },

    doSearch() {
      //  path: '/example',
      // component: Layout,
      // redirect: '/example/list',
      // name: 'Example',

      // meta: {
      //   title: 'example',
      //   icon: 'el-icon-s-help',
      //   noCache:true
      // },
      getMenus().then(response => {
        response.forEach(item => {
          const arr = []

          if (item.subMenus) {
            this.menuCards(item.subMenus)
          }
        })
        this.menu = response
      })
    },
    menuCards(list) {
      list.forEach(item => {
        if (!item.subMenus) {
          delete item.subMenus
        } else {
          this.menuCards(item.subMenus)
        }
      })
    }
  }
}
</script>
