<template lang="html">
  <div class="list">
    <div class="search-area">
      <span class="iconfont icon-search"></span>
      <input class="search-input" :placeholder="searchInputPlaceholder" v-model="searchInput" @input="search"></input>
    </div>
    <div class="control-area">
      <div class="filter-button" @click="togglePanelDisplay">
        筛选
        <span class="iconfont" :class="togglePanelIcon"></span>
      </div>
      <div class="num-info">{{totalNumText}}</div>
    </div>

    <div class="list-area" ref="listArea" :class="{'including-function-area': !showAdd}">
      <div v-if="listType === MY_PATIENTS_TYPE">
        <patient-list-item class="item" v-for="patient in myPatientsList" :patient="patient" :key="patient.patientId"></patient-list-item>
      </div>
      <div v-else-if="listType === GROUP_TYPE">
        <group-list-item v-for="group in groupList" :group="group" :mode="listMode" :key="group.groupId"
          @select="addToSelectedGroupList(group.groupId)" @unselect="removeFromSelectedGroupList(group.groupId)"></group-list-item>
      </div>
      <div v-else-if="listType === OTHER_PATIENTS_TYPE">
        <patient-list-item class="item" v-for="patient in otherPatientsList" :patient="patient" :key="patient.patientId"></patient-list-item>
      </div>
      <div v-else-if="listType === SUBJECT_PATIENTS_TYPE">
        <patient-list-item class="item" v-for="patient in subjectPatientsList" :patient="patient" :key="patient.patientId"></patient-list-item>
      </div>
      <div v-else-if="listType === THERAPISTS_PATIENTS_TYPE">
        <patient-list-item class="item" v-for="patient in therapistsPatientsList" :patient="patient" :key="patient.patientId"></patient-list-item>
      </div>
      <div v-else-if="listType === APPRAISERS_PATIENTS_TYPE">
        <patient-list-item class="item" v-for="patient in appraisersPatientsList" :patient="patient" :key="patient.patientId"></patient-list-item>
      </div>
      <div v-else-if="listType === GROUP_TYPE">
        <user-list-item class="item" v-for="user in userList" :user="user" :key="user.id"></user-list-item>
      </div>
      <div v-else-if="listType === ROLE_TYPE">
        <role-list-item class="item" v-for="role in roleList" :role="role" :key="role.id"></role-list-item>
      </div>
    </div>

    <div class="function-area" v-if="listType===MY_PATIENTS_TYPE">
      <div class="function-button whole-line" @click="addNewPatient">
        <span class="iconfont icon-new-patient"></span>
        <span class="text">新增患者</span>
      </div>
      <div class="function-button right" v-show="false">
        <span class="iconfont icon-import"></span>
        <span class="text">批量导入</span>
      </div>
    </div>
    <div class="function-area" v-else-if="listType===GROUP_TYPE">
      <div class="function-button left" v-show="listMode===READING_MODE" @click="addNewGroup">
        <span class="iconfont icon-new-group"></span>
        <span class="text">新增分组</span>
      </div>
      <div class="function-button right" v-show="listMode===READING_MODE" @click="toggleListMode(EDITING_MODE)">
        <span class="iconfont icon-delete"></span>
        <span class="text">删除分组</span>
      </div>
      <div class="function-button left" v-show="listMode===EDITING_MODE" @click="toggleListMode(READING_MODE)">
        <span class="iconfont icon-cancel"></span>
        <span class="text">取消</span>
      </div>
      <div class="function-button right warning" :class="{'disabled': selectedGroupList.length===0}"
        v-show="listMode===EDITING_MODE" @click="deleteSeletedGroupList">
        <span class="iconfont icon-ok"></span>
        <span class="text">删除</span>
      </div>
    </div>

    <transition name="slide-fade">
      <el-form class="filter-panel" :model="filterPatientsForm" :rules="rules" ref="filterPatientsForm"
      label-width="25%"  v-show="panelDisplay && (listType === MY_PATIENTS_TYPE || listType === OTHER_PATIENTS_TYPE ||
        listType === SUBJECT_PATIENTS_TYPE || listType === THERAPISTS_PATIENTS_TYPE || listType === APPRAISERS_PATIENTS_TYPE)">
        <el-form-item label="分组" prop="group" class="item"
          v-if="listType === MY_PATIENTS_TYPE">
          <el-select v-model="filterPatientsForm.group">
            <el-option label="不限" :value="-1"></el-option>
            <el-option v-for="option in getOptions('group')" :label="option.name"
              :value="option.code" :key="option.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院" prop="hospital" class="item"
          v-if="listType === SUBJECT_PATIENTS_TYPE">
          <el-select v-model="filterPatientsForm.hospital">
            <el-option label="不限" :value="-1"></el-option>
            <el-option v-for="option in getOptions('hospital')" :label="option.name"
              :value="option.code" :key="option.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="gender" class="item">
          <el-select v-model="filterPatientsForm.gender">
            <el-option label="不限" :value="-1"></el-option>
            <el-option v-for="option in getOptions('sex')" :label="option.name"
              :value="option.code" :key="option.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区" prop="homeProvince" class="item">
          <el-select v-model="filterPatientsForm.homeProvince">
            <el-option label="不限" :value="-1"></el-option>
            <el-option v-for="option in getOptions('homeProvince')" :label="option.name"
              :value="option.code" :key="option.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病程" class="item" v-if="false">
          <el-col :span="8">
            <el-form-item prop="minCourseYear">
              <el-input v-model.number="filterPatientsForm.minCourseYear" :min="0" :max="120"
                placeholder="不限"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">年 -</el-col>
          <el-col :span="8">
            <el-form-item prop="maxCourseYear">
              <el-input v-model.number="filterPatientsForm.maxCourseYear" :min="0" :max="120" placeholder="不限"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">年</el-col>
        </el-form-item>
        <el-form-item label="年龄" class="item">
          <el-col :span="8">
            <el-form-item prop="minAge">
              <el-input v-model.number="filterPatientsForm.minAge" :min="0" :max="120" placeholder="不限"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">岁 -</el-col>
          <el-col :span="8">
            <el-form-item prop="maxAge">
              <el-input v-model.number="filterPatientsForm.maxAge" :min="0" :max="120" placeholder="不限"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">岁</el-col>
        </el-form-item>
        <el-form-item label="实验期" prop="experimentStatus" class="item" v-if="inSubject">
          <el-select v-model="filterPatientsForm.experimentStatus">
            <el-option label="不限" :value="-1"></el-option>
            <el-option v-for="option in getOptions('taskStatus')" :label="option.name" :value="option.code" :key="option.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label-width="0">
          <el-button @click="resetForm('filterPatientsForm')" class="button reset">重置</el-button>
          <el-button type="primary" @click="submitForm('filterPatientsForm')" class="button apply">应用</el-button>
        </el-form-item>
      </el-form>
    </transition>
    <transition name="slide-fade">
      <el-form class="filter-panel" :model="filterGroupsForm" :rules="rules" ref="filterGroupsForm"
      label-width="20%" v-show="panelDisplay && listType === GROUP_TYPE">
        <el-form-item label="分类" prop="groupType" class="item">
          <el-select v-model="filterGroupsForm.groupType">
            <el-option label="不限" :value="-1"></el-option>
            <el-option label="临床" :value="1"></el-option>
            <el-option label="科研" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label-width="0">
          <el-button @click="resetForm('filterGroupsForm')" class="button reset">重置</el-button>
          <el-button type="primary" @click="submitForm('filterGroupsForm')" class="button apply">应用</el-button>
        </el-form-item>
      </el-form>
    </transition>
    <transition name="slide-fade">
      <el-form class="filter-panel" :model="filterUsersForm" :rules="rules" ref="filterUsersForm"
        label-width="20%" v-show="panelDisplay && listType === USER_TYPE">
        <el-form-item label="分组" prop="type" class="item">
          <el-select v-model="filterUsersForm.type">
            <el-option label="全部" value="all"></el-option>
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="普通用户" value="normal"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职称" prop="title" class="item">
          <el-select v-model="filterUsersForm.title">
            <el-option label="全部" value="all"></el-option>
            <el-option label="主任医师" value="chiefPhysician"></el-option>
            <el-option label="副主任医师" value="associateChiefPhysician"></el-option>
            <el-option label="主治医师" value="attendingPhysician"></el-option>
            <el-option label="医师" value="physician"></el-option>
            <el-option label="住院医师" value="residentPhysician"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区" prop="status" class="item">
          <el-select v-model="filterUsersForm.status">
            <el-option label="不限" value="all"></el-option>
            <el-option label="启用" value="on"></el-option>
            <el-option label="停用" value="off"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label-width="0">
          <el-button @click="resetForm('filterUsersForm')" class="button reset">重置</el-button>
          <el-button type="primary" @click="submitForm('filterUsersForm')" class="button apply">应用</el-button>
        </el-form-item>
      </el-form>
    </transition>
    <transition name="slide-fade">
      <el-form class="filter-panel" :model="filterRolesForm" :rules="rules" ref="filterRolesForm"
      label-width="20%"  v-show="panelDisplay && listType === ROLE_TYPE">
        <el-form-item label="分类" prop="type" class="item">
          <el-select v-model="filterUsersForm.type">
            <el-option label="全部" value="all"></el-option>
            <el-option label="默认" value="default"></el-option>
            <el-option label="自定义" value="custom"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label-width="0">
          <el-button @click="resetForm('filterRolesForm')" class="button reset">重置</el-button>
          <el-button type="primary" @click="submitForm('filterRolesForm')" class="button apply">应用</el-button>
        </el-form-item>
      </el-form>
    </transition>
  </div>
</template>

<script>
import Ps from 'perfect-scrollbar';

import patientListItem from 'views/list/patient-item/PatientItem';
import groupListItem from 'views/list/group-item/GroupItem';
import userListItem from 'views/configuration/usermanagement/user-item/UserItem';
import roleListItem from 'views/configuration/rolemanagement/role-item/RoleItem';

import { mapGetters } from 'vuex';
import Bus from 'utils/bus.js';
import Util from 'utils/util';
import { getPatientList } from 'api/patient';
import { getUserList, getRoleList } from 'api/user';
import { getGroupList, deleteGroup } from 'api/group';
import { getSubjectHospitalList } from 'api/subject';

export default {
  data() {
    // 自定义校验规则，可以为空，数值在 0 ~ 120 之间
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback();
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('输入数字'));
        } else {
          if (value < 0 || value > 120) {
            callback(new Error('0~120之间'));
          } else {
            callback();
          }
        }
      }, 0);
    };
    return {
      searchInput: '',
      timeout: null,

      myPatientsList: [],
      otherPatientsList: [],
      subjectPatientsList: [],
      therapistsPatientsList: [],
      appraisersPatientsList: [],
      groupList: [],
      userList: [],
      roleList: [],

      panelDisplay: false,
      hasFirstUpdatedList: false,
      listMode: this.READING_MODE,

      selectedGroupList: [],
      hospitalList: [],

      filterPatientsForm: {
        group: -1,
        hospital: -1,
        gender: -1,
        homeProvince: -1,
        minAge: '',
        maxAge: '',
        minCourseYear: '',
        maxCourseYear: '',
        followUp: false,
        experimentStatus: -1
      },
      filterGroupsForm: {
        groupType: -1
      },
      filterUsersForm: {
        type: 'all',
        title: 'all',
        status: 'on'
      },
      filterRolesForm: {
        type: 'all'
      },
      rules: {
        minCourseYear: [
          { validator: checkNum, trigger: 'change' }
        ],
        maxCourseYear: [
          { validator: checkNum, trigger: 'change' }
        ],
        minAge: [
          { validator: checkNum, trigger: 'change' }
        ],
        maxAge: [
          { validator: checkNum, trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters([
      'typeGroup'
    ]),
    subjectId() {
      return this.$store.state.subjectId;
    },
    inSubject() {
      return this.$store.state.subjectId !== this.SUBJECT_ID_FOR_HOSPITAL;
    },
    showSensitiveInfo() {
      return this.$store.state.showSensitiveInfo;
    },
    showAdd() {
      if (this.listType === this.OTHER_PATIENTS_TYPE || this.listType === this.SUBJECT_PATIENTS_TYPE ||
        this.listType === this.THERAPISTS_PATIENTS_TYPE || this.listType === this.APPRAISERS_PATIENTS_TYPE) {
        return false;
      } else {
        return true;
      }
    },
    // 根据路由信息对象提供的当前路径，来判断列表类型
    listType() {
      var path = this.$route.path;
      if (/^\/patients\/list/.test(path)) {
        this.$store.commit('UPDATE_LIST_TYPE', this.MY_PATIENTS_TYPE);
      } else if (/^\/patients\/groups/.test(path)) {
        this.$store.commit('UPDATE_LIST_TYPE', this.GROUP_TYPE);
      } else if (/^\/patients\/otherList/.test(path)) {
        this.$store.commit('UPDATE_LIST_TYPE', this.OTHER_PATIENTS_TYPE);
      } else if (/^\/patients\/subjectList/.test(path)) {
        this.$store.commit('UPDATE_LIST_TYPE', this.SUBJECT_PATIENTS_TYPE);
      } else if (/^\/patients\/therapistsPatientList/.test(path)) {
        this.$store.commit('UPDATE_LIST_TYPE', this.THERAPISTS_PATIENTS_TYPE);
      } else if (/^\/patients\/appraisersPatientList/.test(path)) {
        this.$store.commit('UPDATE_LIST_TYPE', this.APPRAISERS_PATIENTS_TYPE);
      } else if (/^\/configuration\/userManagement/.test(path)) {
        this.$store.commit('UPDATE_LIST_TYPE', this.USER_TYPE);
      } else if (/^\/configuration\/roleManagement/.test(path)) {
        this.$store.commit('UPDATE_LIST_TYPE', this.ROLE_TYPE);
      } else {
        this.$store.commit('UPDATE_LIST_TYPE', '');
      }
      return this.$store.state.listType;
    },
    searchInputPlaceholder() {
      if (this.listType === this.MY_PATIENTS_TYPE ||
        this.listType === this.OTHER_PATIENTS_TYPE ||
        this.listType === this.SUBJECT_PATIENTS_TYPE ||
        this.listType === this.THERAPISTS_PATIENTS_TYPE ||
        this.listType === this.APPRAISERS_PATIENTS_TYPE) {
        if (this.$store.state.showSensitiveInfo === false) {
          return '请输入患者姓名编码';
        } else {
          return '请输入姓名/身份证号/手机号';
        }

      } else if (this.listType === this.GROUP_TYPE) {
        return '请输入组名';
      }
    },
    totalNumText() {
      if (this.listType === this.MY_PATIENTS_TYPE) {
        return '患者：' + this.myPatientsList.length + '人';
      } else if (this.listType === this.GROUP_TYPE) {
        return '分组：' + this.groupList.length + '个';
      } else if (this.listType === this.OTHER_PATIENTS_TYPE) {
        return '患者：' + this.otherPatientsList.length + '人';
      } else if (this.listType === this.SUBJECT_PATIENTS_TYPE) {
        return '患者：' + this.subjectPatientsList.length + '人';
      } else if (this.listType === this.THERAPISTS_PATIENTS_TYPE) {
        return '患者：' + this.therapistsPatientsList.length + '人';
      } else if (this.listType === this.APPRAISERS_PATIENTS_TYPE) {
        return '患者：' + this.appraisersPatientsList.length + '人';
      } else if (this.listType === this.USER_TYPE) {
        return '用户：86人';
      } else if (this.listType === this.USER_TYPE) {
        return '角色：3种';
      }
    },
    togglePanelIcon() {
      return this.panelDisplay ? 'icon-up' : 'icon-down';
    }
  },
  mounted() {
    // 如果在某个指定了 id 的页面进行刷新，checkRoute函数内的[更新列表数据]不会执行，这个时候就需要手动更新
    if (!this.hasFirstUpdatedList) {
      this.updateCurrentList();
    }

    if (this.inSubject) {
      this.updateHospitalList();
    }

    Bus.$on(this.UPDATE_PATIENTS_LIST, this.updatePatientsList);

    Bus.$on(this.UPDATE_GROUP_LIST, this.updateGroupList);
    Bus.$on(this.SCREEN_SIZE_CHANGE, this.updateScrollbar);
    Bus.$on(this.GIVE_UP, () => {
      Bus.$off(this.CONFIRM);
    });
    Bus.$on(this.UPDATE_ITEM_POSITION, this.setScrollbarPosition);
  },
  methods: {
    search() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (this.listType === this.MY_PATIENTS_TYPE ||
          this.listType === this.OTHER_PATIENTS_TYPE ||
          this.listType === this.SUBJECT_PATIENTS_TYPE ||
          this.listType === this.THERAPISTS_PATIENTS_TYPE ||
          this.listType === this.APPRAISERS_PATIENTS_TYPE
          ) {
          this.updatePatientsList();
        } else if (this.listType === this.GROUP_TYPE) {
          this.updateGroupList();
        }
      }, 1000);
    },
    updateCurrentList() {
      if (this.listType === this.MY_PATIENTS_TYPE ||
        this.listType === this.OTHER_PATIENTS_TYPE ||
        this.listType === this.SUBJECT_PATIENTS_TYPE ||
        this.listType === this.THERAPISTS_PATIENTS_TYPE ||
        this.listType === this.APPRAISERS_PATIENTS_TYPE) {
        this.updatePatientsList(this.checkRoute);
      } else if (this.listType === this.GROUP_TYPE) {
        this.updateGroupList(this.checkRoute);
      } else if (this.listType === this.USERTYPE_TYPE) {
        this.updateUserList(this.checkRoute);
      } else if (this.listType === this.ROLE_TYPE) {
        this.updateRoleList(this.checkRoute);
      } else {
        console.log('unknown listType');
      }
    },
    updateHospitalList() {
      var condition = {
        taskId: this.subjectId
      };
      getSubjectHospitalList(condition).then((data) => {
        this.hospitalList = data ? data : [];
      }, (error) => {
        console.log(error);
      });
    },
    updateScrollbar() {
      this.$nextTick(() => {
        if (!this.$refs.listArea) {
          return;
        }
        Ps.destroy(this.$refs.listArea);
        Ps.initialize(this.$refs.listArea, {
          wheelSpeed: 1,
          minScrollbarLength: 40
        });
      });
    },
    setScrollbarPosition() {
      this.$nextTick(() => {
        var patientId = this.$route.params.id;
        var patientIdx;
        this.myPatientsList.map(function(obj, i) {
          if (obj.patientId === parseInt(patientId, 10)) {
            patientIdx = i;
          }
        });
        if (!this.$refs.listArea) {
          return;
        }
        this.$refs.listArea.scrollTop = patientIdx * 60;
      });
    },
    updatePatientsList(cb) {
      // 根据筛选条件更新“我的患者”列表，如果不传入条件参数，则默认不作筛选
      var condition = {
        'type': 1
      };
      if (this.listType === this.MY_PATIENTS_TYPE && !this.inSubject) {
        condition.type = 1;
        delete condition.taskId;
      } else if (this.listType === this.OTHER_PATIENTS_TYPE) {
        condition.type = 2;
        delete condition.taskId;
      } else if (this.listType === this.MY_PATIENTS_TYPE && this.inSubject) {
        condition.type = 3;
        condition.taskId = this.$store.state.subjectId;
      } else if (this.listType === this.SUBJECT_PATIENTS_TYPE) {
        condition.type = 4;
        condition.taskId = this.$store.state.subjectId;
      } else if (this.listType === this.THERAPISTS_PATIENTS_TYPE) {
        condition.type = 5;
        condition.taskId = this.$store.state.subjectId;
      } else if (this.listType === this.APPRAISERS_PATIENTS_TYPE) {
        condition.type = 6;
        condition.taskId = this.$store.state.subjectId;
      }

      if (this.searchInput !== '') {
        condition.keyword = this.searchInput.trim();
      }

      var filterForm = this.filterPatientsForm;
      if (filterForm.group !== -1) {
        condition.groupId = filterForm.group;
      }
      if (filterForm.hospital !== -1) {
        condition.departId = filterForm.hospital;
      }
      if (filterForm.gender !== -1) {
        condition.sex = filterForm.gender;
      }
      if (filterForm.homeProvince !== -1) {
        condition.birthPlace = filterForm.homeProvince;
      }
      if (filterForm.minAge !== '') {
        condition.ageFrom = filterForm.minAge;
      }
      if (filterForm.maxAge !== '') {
        condition.ageTo = filterForm.maxAge;
      }
      if (filterForm.experimentStatus !== -1) {
        condition.status = filterForm.experimentStatus;
      }

      this.hasFirstUpdatedList = true;   // 这个变量用来阻止初次登录界面时，发出重复请求
      getPatientList(condition).then((data) => {
        if (this.listType === this.MY_PATIENTS_TYPE) {
          this.myPatientsList = data ? data : [];
        } else if (this.listType === this.OTHER_PATIENTS_TYPE) {
          this.otherPatientsList = data ? data : [];
        } else if (this.listType === this.SUBJECT_PATIENTS_TYPE) {
          this.subjectPatientsList = data ? data : [];
        } else if (this.listType === this.THERAPISTS_PATIENTS_TYPE) {
          this.therapistsPatientsList = data ? data : [];
        } else if (this.listType === this.APPRAISERS_PATIENTS_TYPE) {
          this.appraisersPatientsList = data ? data : [];
        }
        this.updateScrollbar();
        this.setScrollbarPosition();
        // 如果有回调函数作为参数传递进来了，则执行该函数
        cb && cb();
      }, (error) => {
        console.log(error);
      });
    },
    updateGroupList(cb) {
      var condition = {};
      var filterForm = this.filterGroupsForm;
      if (filterForm.groupType !== -1 && this.listType === this.GROUP_TYPE) {
        condition.groupType = filterForm.groupType;
      }
      if (this.searchInput !== '' && this.listType === this.GROUP_TYPE) {
        condition.groupeName = this.searchInput.trim();
      }
      condition.groupModule = this.inSubject ? this.$store.state.subjectId : 0;
      this.hasFirstUpdatedList = true;
      getGroupList(condition).then((data) => {
        this.groupList = data ? data : [];
        cb && cb();
      }, (error) => {
        console.log(error);
      });
      this.updateScrollbar();
    },
    updateUserList(cb) {
      this.hasFirstUpdatedList = true;
      getUserList().then((data) => {
        this.userList = data.userRoles ? data.userRoles : [];
        this.updateScrollbar();
        // 如果有回调函数作为参数传递进来了，则执行该函数
        cb && cb();
      }, (error) => {
        console.log(error);
      });
    },
    updateRoleList(cb) {
      this.hasFirstUpdatedList = true;
      getRoleList().then((data) => {
        this.roleList = data.userRoleDTOList ? data.userRoleDTOList : [];
        this.updateScrollbar();
        // 如果有回调函数作为参数传递进来了，则执行该函数
        cb && cb();
      }, (error) => {
        console.log(error);
      });
    },
    addNewPatient() {
      if (this.listType === this.MY_PATIENTS_TYPE) {
        this.$router.push({
          name: 'patientInfo', params: {id: 'newPatient'}
        });
      } else if (this.listType === this.OTHER_PATIENTS_TYPE) {
        this.$router.push({
          name: 'otherPatientInfo', params: {id: 'newPatient'}
        });
      } else if (this.listType === this.SUBJECT_PATIENTS_TYPE) {
        this.$router.push({
          name: 'subjectPatientInfo', params: {id: 'newPatient'}
        });
      } else if (this.listType === this.THERAPISTS_PATIENTS_TYPE) {
        this.$router.push({
          name: 'therapistsPatientInfo', params: {id: 'newPatient'}
        });
      } else if (this.listType === this.APPRAISERS_PATIENTS_TYPE) {
        this.$router.push({
          name: 'appraisersPatientInfo', params: {id: 'newPatient'}
        });
      }
    },
    toggleListMode(listMode) {
      this.listMode = listMode;
      if (this.listMode === this.EDITING_MODE && this.listType === this.GROUP_TYPE) {
        // 在分组列表下，进入删除模式
        this.selectedGroupList = [];
      }
    },
    addNewGroup() {
      // Bus.$emit(this.SHOW_GROUP_MODAL);
      Bus.$emit(this.MOUNT_DYNAMIC_COMPONENT, 'groupModal', this.SHOW_GROUP_MODAL);
    },
    deleteSeletedGroupList() {
      // 首先检查是否有选择分组，假如一个都没选，那么点击删除是不会有效果的
      if (this.selectedGroupList.length === 0) {
        return;
      }

      Bus.$emit(this.REQUEST_CONFIRMATION, '', '是否确定删除该分组？分组删除后将无法恢复。');
      Bus.$on(this.CONFIRM, () => {
        // 删除的时候要检查一下，右侧内容区域显示的分组，是否是待删除的分组之一，
        // 如果是，那么在删除之后跳转到新列表第一个分组
        var isToDelete = this.selectedGroupList.indexOf(this.$route.params.id) >= 0;
        deleteGroup(this.selectedGroupList).then(() => {
          this.updateGroupList(() => {
            if (isToDelete) {
              this.$router.push({
                name: 'groupsManagement'
              });
            }
          });
          this.toggleListMode(this.READING_MODE);
          this.$message({
            message: '成功删除分组',
            type: 'success',
            duration: 2000
          });
          Bus.$off(this.CONFIRM);
        }, (error) => {
          console.log(error);
          this.$message({
            message: '发生错误，请稍后再试',
            type: 'error',
            duration: 2000
          });
          Bus.$off(this.CONFIRM);
        });
      });
    },
    addToSelectedGroupList(groupId) {
      if (this.selectedGroupList.indexOf(groupId) < 0) {
        this.selectedGroupList.push(groupId);
      }
    },
    removeFromSelectedGroupList(groupId) {
      var index = this.selectedGroupList.indexOf(groupId);
      if (index >= 0) {
        this.selectedGroupList.splice(index, 1);
      }
    },
    togglePanelDisplay() {
      this.panelDisplay = !this.panelDisplay;
      if (this.panelDisplay &&
        (this.listType === this.MY_PATIENTS_TYPE ||
        this.listType === this.OTHER_PATIENTS_TYPE ||
        this.listType === this.SUBJECT_PATIENTS_TYPE ||
        this.listType === this.THERAPISTS_PATIENTS_TYPE ||
        this.listType === this.APPRAISERS_PATIENTS_TYPE)) {
        // 在患者管理列表，每次打开筛选面板的时候，都要去更新一次 groupList，
        // 因为有一个筛选框是筛选分组的，而分组信息需要经常更新
        this.updateGroupList();
      }
    },
    getOptions(fieldName) {
      var options = [];
      if (fieldName === 'group') {
        for (let group of this.groupList) {
          options.push({
            name: group.groupName,
            code: group.groupId
          });
        }
      } else if (fieldName === 'hospital') {
        for (let hospital of this.hospitalList) {
          options.push({
            name: hospital.departname,
            code: hospital.id
          });
        }
      } else {
        var types = Util.getElement('typegroupcode', fieldName, this.typeGroup).types;
        types = types ? types : [];
        for (let type of types) {
          options.push({
            name: type.typeName,
            code: type.typeCode
          });
        }
      }
      return options;
    },
    resetForm(formName, cb) {
      this.$refs[formName].resetFields();
      this.submitForm(formName, cb);
    },
    submitForm(formName, cb) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交新的筛选条件，发出post请求
          if (formName === 'filterPatientsForm') {
            this.updatePatientsList(cb);
          } else if (formName === 'filterGroupsForm') {
            this.updateGroupList(cb);
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      this.panelDisplay = false;
    },
    checkRoute() {
      var path = this.$route.path;

      // 一旦发现路由地址中还没有id，就更新病患列表数据，并默认加载当前列表中的第一项
      if (/^\/patients\/list\/?$/.test(path)) {
        if (this.myPatientsList.length > 0) {
          let firstPatientId = this.myPatientsList[0].patientId;
          this.$router.replace({
            name: 'patientInfo',
            params: { id: firstPatientId }
          });
        }

      } else if (/^\/patients\/groups\/?$/.test(path)) {
        // 获取分组列表的所有id，然后根据第一个id进行跳转
        if (this.groupList.length > 0) {
          let firstGroupId = this.groupList[0].groupId;
          this.$router.replace({
            name: 'groupInfo',
            params: { id: firstGroupId }
          });
        }

      } else if (/^\/patients\/otherList\/?$/.test(path)) {
        if (this.otherPatientsList.length > 0) {
          let firstPatientId = this.otherPatientsList[0].patientId;
          this.$router.replace({
            name: 'otherPatientInfo',
            params: { id: firstPatientId }
          });
        }

      } else if (/^\/patients\/subjectList\/?$/.test(path)) {
        if (this.subjectPatientsList.length > 0) {
          let firstPatientId = this.subjectPatientsList[0].patientId;
          this.$router.replace({
            name: 'subjectPatientInfo',
            params: { id: firstPatientId }
          });
        }

      } else if (/^\/patients\/therapistsPatientList\/?$/.test(path)) {
        if (this.therapistsPatientsList.length > 0) {
          let firstPatientId = this.therapistsPatientsList[0].patientId;
          this.$router.replace({
            name: 'therapistsPatientInfo',
            params: { id: firstPatientId }
          });
        }

      } else if (/^\/patients\/appraisersPatientList\/?$/.test(path)) {
        if (this.appraisersPatientsList.length > 0) {
          let firstPatientId = this.appraisersPatientsList[0].patientId;
          this.$router.replace({
            name: 'appraisersPatientInfo',
            params: { id: firstPatientId }
          });
        }

      } else if (/^\/configuration\/userManagement\/?$/.test(path)) {
        if (this.userList.length > 0) {
          let firstUserId = this.userList[0].id;
          this.$router.replace({
            name: 'userInfo',
            params: { id: firstUserId }
          });
        }

      } else if (/^\/configuration\/roleManagement\/?$/.test(path)) {
        if (this.roleList.length > 0) {
          let firstRoleId = this.roleList[0].roleId;
          this.$router.replace({
            name: 'roleInfo',
            params: { id: firstRoleId }
          });
        }
      }
    }
  },
  components: {
    patientListItem,
    groupListItem,
    userListItem,
    roleListItem
  },
  watch: {
    '$route.path'() {
      // 路由一旦发生变化，就关闭筛选面板
      this.panelDisplay = false;
    },
    listType() {
      // 列表类型一旦发生变化，则清空搜索框内容
      this.searchInput = '';
      // 同时清空各个筛选面板，重新获取列表
      if (this.listType === this.MY_PATIENTS_TYPE ||
        this.listType === this.OTHER_PATIENTS_TYPE ||
        this.listType === this.SUBJECT_PATIENTS_TYPE ||
        this.listType === this.THERAPISTS_PATIENTS_TYPE ||
        this.listType === this.APPRAISERS_PATIENTS_TYPE) {
        this.resetForm('filterPatientsForm', this.checkRoute);
        Bus.$emit(this.SHOW_LIST);
      } else if (this.listType === this.GROUP_TYPE) {
        this.resetForm('filterGroupsForm', this.checkRoute);
        Bus.$emit(this.SHOW_LIST);
      }
    },
    showSensitiveInfo() {
      this.updateCurrentList();
    }
  },
  beforeDestroy() {
    Bus.$off(this.UPDATE_PATIENTS_LIST);
    Bus.$off(this.UPDATE_GROUP_LIST);
    Bus.$off(this.SCREEN_SIZE_CHANGE);
    Bus.$off(this.CONFIRM);
    Bus.$off(this.GIVE_UP);
  }
};
</script>

<style lang="less">
@import "~styles/variables.less";

@search-area-height: 40px;
@control-area-height: 35px;
@function-area-height: 45px;

@list-left-padding: 8px;
@list-right-padding: 0px;

@filter-text-height: 30px;

.list {
  box-sizing: border-box;
  background-color: @screen-color;
  padding-left: @list-left-padding;
  padding-right: @list-right-padding;
  overflow: hidden;
  .search-area {
    position: relative;
    margin-bottom: @vertical-spacing;
    width: 100%;
    height: @search-area-height;
    padding-top: 10px;
    padding-left: 15px;
    box-sizing: border-box; // box-shadow: 2px 2px 2px @light-gray-color;
    background-color: @background-color;
    font-size: @normal-font-size;
    color: @light-font-color;
    z-index: 200;
    .iconfont {
      float: left;
      padding-right: 10px;
      line-height: 1.9 * @normal-font-size;
      vertical-align: middle;
    }
    .search-input {
      float: left;
      width: 180px;
      padding: 5px;
      // padding-right: 5px;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid @light-gray-color;
      // line-height: 1.6 * @normal-font-size;
      vertical-align: middle;
      color: @light-font-color;
      outline: none;
    }
     ::-webkit-input-placeholder {
      /* WebKit browsers */
      color: darken(@light-gray-color, 20%);
    }
     :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: darken(@light-gray-color, 20%);
    }
     ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: darken(@light-gray-color, 20%);
    }
     :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: darken(@light-gray-color, 20%);
    }
  }
  .control-area {
    position: relative;
    margin-bottom: @vertical-spacing;
    width: 100%;
    height: @control-area-height;
    background-color: @background-color;
    box-sizing: border-box; // box-shadow: 2px 2px 2px @light-gray-color;
    font-size: @normal-font-size;
    text-align: left;
    z-index: 200;
    .filter-button {
      position: absolute;
      display: inline-block;
      left: 0;
      width: 30%;
      height: 100%;
      padding-left: 10px;
      box-sizing: border-box;
      line-height: @control-area-height;
      cursor: pointer;
      &:hover {
        color: lighten(@font-color, 20%);
      }
      .iconfont {
        padding-left: 5px;
        font-size: @normal-font-size;
        font-weight: bold;
        vertical-align: middle;
        color: @button-color;
      }
    }
    .num-info {
      position: absolute;
      display: inline-block;
      right: 0;
      width: 50%;
      height: 100%;
      padding-right: 10px;
      box-sizing: border-box;
      line-height: @control-area-height;
      text-align: right;
      cursor: default;
    }
  }
  .function-area {
    position: relative;
    bottom: 0;
    margin-top: @vertical-spacing;
    width: 100%;
    height: @function-area-height;
    background-color: @theme-color;
    color: #fff;
    box-sizing: border-box;
    font-size: @normal-font-size;
    vertical-align: middle;
    .function-button {
      float: left;
      margin-top: @function-area-height * 0.15;
      margin-bottom: @function-area-height * 0.15;
      width: 50%;
      height: 70%;
      box-sizing: border-box;
      line-height: @function-area-height * 0.7;
      transition: color 0.3s;
      cursor: pointer;
      &.left {
        border-right: 1px solid @light-gray-color;
      }
      &.whole-line {
        width: 100%;
      }
      &:hover {
        opacity: 0.6;
      }
      &:active {
        opacity: 0.8;
      }
      &.warning {
        color: @alert-color;
      }
      &.disabled {
        color: @gray-color;
      }
      .iconfont {
        font-size: 24px;
        line-height: 20px;
        vertical-align: middle;
        &.icon-cancel {
          font-size: 20px;
        }
        &.icon-ok {
          font-size: 22px;
        }
      }
    }
  }
  .list-area {
    position: relative;
    width: 100%;
    height: calc(~"100% - @{search-area-height} - @{control-area-height} - @{function-area-height} - @{vertical-spacing} * 3");
    background-color: @background-color; // box-shadow: 2px 2px 2px @light-gray-color;
    overflow: hidden;
    &.including-function-area {
      height: calc(~"100% - @{search-area-height} - @{control-area-height} - @{vertical-spacing} * 2");
    }
    .item {
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: darken(@background-color, 2%);
      }
      &.current {
        background-color: darken(@background-color, 8%);
        &:hover {
          background-color: darken(@background-color, 8%);
        }
      }
    }
    // 下面这组 CSS 是为了让 perfect-scrollbar正常工作的，不知道为什么，默认状态下这个组件不能正常显示
    .ps__scrollbar-y-rail {
      position: absolute;
      width: 15px;
      right: 0;
      padding: 0 3px;
      box-sizing: border-box;
      opacity: 0.3;
      transition: opacity 0.3s, padding 0.2s;
      .ps__scrollbar-y {
        position: relative;
        background-color: #aaa;
        border-radius: 20px;
      }
    }
    &:hover {
      .ps__scrollbar-y-rail {
        opacity: 0.6;
        &:hover {
          padding: 0;
        }
      }
    }
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(0.42, 0, 1, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(-@control-area-height);
    opacity: 0;
  }
  .filter-panel {
    position: absolute;
    top: @search-area-height + @control-area-height + @vertical-spacing;
    left: @list-left-padding;
    margin-right: @list-right-padding;
    width: calc(~"100% - @{list-left-padding} - @{list-right-padding}");
    height: calc(~"100% - @{search-area-height} - @{control-area-height} - @{vertical-spacing}");
    padding-top: 20px;
    background-color: @theme-color;
    font-size: @normal-font-size;
    color: @inverse-font-color;
    z-index: 150;
    .item {
      padding-left: 10px;
      padding-right: 10px;
      .el-form-item__label {
        color: @inverse-font-color;
      }
      .el-form-item__content input {
        // background-color: #414a54;
      }
      .button {
        margin: 30px 10px;
        width: 35%;
        border: none;
        color: @button-font-color;
        &.reset {
          background-color: @secondary-button-color;
        }
        &.apply {
          background-color: @button-color;
        }
        &:hover {
          opacity: 0.8;
        }
        &:active {
          opacity: 0.9;
        }
      }
    }
  }
}
</style>
