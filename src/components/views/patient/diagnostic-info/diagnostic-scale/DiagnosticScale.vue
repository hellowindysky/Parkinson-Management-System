<template lang="html">
  <folding-panel :title="'医学量表'" :mode="mutableMode"  v-on:edit="startEditing"
    v-on:cancel="cancel" v-on:submit="submit" :editable="canEdit" v-if="!hidePanel">
    <div class="diagnostic-scale" ref="diagnosticscale">
      <extensible-panel class="panel" :mode="mutableMode" :title="normalScaleTitle"
        v-on:addNewCard="addScale" :editable="canEdit">
        <card class="card" :class="devideWidth" :mode="mutableMode"
          v-for="(item, index) in patientScale"
          :key="item.id + '' + index" :title="getTitle(item.scaleInfoId)"
          v-on:deleteCurrentCard="deleteScaleRecord(item)"
          v-on:editCurrentCard="editScale(item)"
          v-on:viewCurrentCard="viewScale(item)">
          <div class="text first-line">
            <span class="name">量表得分:</span>
            <span class="value">
              <span v-if="getScaleFormType(item.scaleInfoId)===3">
                不记分
              </span>
              <span v-else>
                {{item.scalePoint}}
              </span>
              <span class="mark">{{getCompleteStatus(item)}}</span>
            </span>
          </div>
          <div class="text second-line">
            <span class="name">量表类型:</span>
            <span class="value">{{getScaleType(item.scaleInfoId)}}</span>
          </div>
          <div class="text third-line">
            <span class="name">填写时间:</span>
            <span class="value">{{item.inspectTime}}</span>
          </div>
          <div class="text fourth-line">
            <span class="name">末次服药:</span>
            <span class="value">{{item.lastTakingTime}}</span>
          </div>
          <div class="text fifth-line">
            <span class="name">开关状态:</span>
            <span class="value">{{getSwitchType(item.switchType)}}</span>
          </div>
        </card>
      </extensible-panel>
      <extensible-panel class="panel" :mode="mutableMode" :title="subjectScaleTitle"
        v-on:addNewCard="addScale" :editable="canEdit">
      </extensible-panel>
    </div>
  </folding-panel>
</template>

<script>
import Bus from 'utils/bus.js';
import Util from 'utils/util.js';
import { mapGetters } from 'vuex';
import { deleteScaleInfo } from 'api/patient.js';

import FoldingPanel from 'public/folding-panel/FoldingPanel';
import ExtensiblePanel from 'public/extensible-panel/ExtensiblePanel';
import Card from 'public/card/Card';

export default {
  data() {
    return {
      mutableMode: this.mode,
      title: '医学量表',
      devideWidth: '',
      scaleId: ''
    };
  },
  props: {
    mode: {
      type: String,
      default: this.READING_MODE
    },
    patientScale: {
      type: Array,
      default: () => []
    },
    diagnosisCreator: {
      type: String,
      default: ''
    },
    diagnosticExperimentStep: {
      type: Number,
      default: 0
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([
      'allScale',
      'typeGroup'
    ]),
    normalScaleTitle() {
      return '临床量表 (' + this.patientScale.length + '条记录)';
    },
    subjectScaleTitle() {
      return '课题评定 (' + 0 + '条记录)';
    },
    allScaleTypes() {
      var typesInfo = Util.getElement('typegroupcode', 'gaugeType', this.typeGroup);
      return typesInfo.types ? typesInfo.types : [];
    },
    hidePanel() {
      if (this.diagnosticExperimentStep === this.EXPERIMENT_STEP_THERAPY) {
        return true;
      }
      return false;
    }
  },
  methods: {
    startEditing() {
      this.mutableMode = this.EDITING_MODE;
    },
    cancel() {
      this.mutableMode = this.READING_MODE;
    },
    submit() {
      this.mutableMode = this.READING_MODE;
    },
    recalculateCardWidth() {
      this.$nextTick(() => {
        var panelWidth = this.$refs.diagnosticscale.clientWidth;
        var devideNum = 1.0;
        // 20px 是卡片的横向间距，定义在了 varaibles.less 中，250px 是卡片的最小宽度
        while (panelWidth / devideNum > 250 + 20) {
          devideNum += 1.0;
        }
        devideNum -= 1;
        // 一排最多显示 10 个卡片
        devideNum = devideNum <= 10 ? devideNum : 10;
        this.devideWidth = 'width-1-' + parseInt(devideNum, 10);
      });
    },
    getTitle(scaleInfoId) {
      // 通过量表的ID来找到量表的名字
      var targetScale = Util.getElement('scaleInfoId', scaleInfoId, this.allScale);
      return targetScale.gaugeName;
    },
    getScaleFormType(scaleInfoId) {
      var targetScale = Util.getElement('scaleInfoId', scaleInfoId, this.allScale);
      return targetScale.formType;
    },
    getOptions(fieldName) {
      var options = [];
      var typesInfo = Util.getElement('typegroupcode', fieldName, this.typeGroup);
      var types = typesInfo.types ? typesInfo.types : [];
      for (let type of types) {
        options.push({
          code: type.typeCode,
          name: type.typeName
        });
      }
      return options;
    },
    getScaleType(scaleInfoId) {
      var scale = Util.getElement('scaleInfoId', scaleInfoId, this.allScale);
      var scaleTypeCode = scale.gaugeType;
      var options = this.getOptions('gaugeType');
      var option = Util.getElement('code', scaleTypeCode, options);
      return option.name ? option.name : '';
    },
    getTypeTitle(typeName) {
      var count = this.patientScale.filter((scale) => {
        return this.getScaleTypeName(scale.scaleInfoId) === typeName;
      }).length;
      return typeName + ' (' + count + '条记录 )';
    },
    getCompleteStatus(item) {
      var hasComplete = item.unCompleteCount === 0;
      if (!hasComplete) {
        return '未完成';
      } else {
        return '';
      }
    },
    editScale(item) {
      // var scaleTypeCode = this.getScaleTypeCode(item.scaleInfoId);
      Bus.$emit(this.SHOW_SCALE_MODAL, this.EDIT_CURRENT_CARD, item, this.canEdit);
    },
    viewScale(item) {
      // var scaleTypeCode = this.getScaleTypeCode(item.scaleInfoId);
      Bus.$emit(this.SHOW_SCALE_MODAL, this.VIEW_CURRENT_CARD, item, this.canEdit);
    },
    addScale() {
      Bus.$emit(this.SHOW_SCALE_MODAL, this.ADD_NEW_CARD, {}, this.canEdit);
    },
    deleteScaleRecord(item) {
      // console.log(item);
      let scaleInfo = {
        id: item.id
      };
      Bus.$on(this.CONFIRM, () => {
        deleteScaleInfo(scaleInfo).then(this._resolveDeletion, this._rejectDeletion);
      });
      Bus.$emit(this.REQUEST_CONFIRMATION);
    },
    _resolveDeletion() {
      // 如果成功删除记录，则重新发出请求，获取最新数据。同时解除 [确认对话框] 的 “确认” 回调函数
      Bus.$emit(this.UPDATE_CASE_INFO);
      Bus.$off(this.CONFIRM);
    },
    _rejectDeletion() {
      // 即使删除不成功，也要解除 [确认对话框] 的 “确认” 回调函数
      Bus.$off(this.CONFIRM);
    },
    getSwitchType(code) {
      code = parseInt(code, 10);
      var info = Util.getElement('typegroupcode', 'switchType', this.typeGroup);
      var types = info.types ? info.types : [];
      var targetOption = Util.getElement('typeCode', code, types);
      return targetOption.typeName ? targetOption.typeName : '';
    },
    getScaleTypeCode(scaleInfoId) {
      var scale = Util.getElement('scaleInfoId', scaleInfoId, this.allScale);
      return scale.gaugeType;
    },
    getScaleTypeName(scaleInfoId) {
      var scale = Util.getElement('scaleInfoId', scaleInfoId, this.allScale);
      return Util.getElement('typeCode', scale.gaugeType, this.allScaleTypes).typeName;
    }
  },
  components: {
    FoldingPanel,
    ExtensiblePanel,
    Card
  },
  mounted() {
    this.recalculateCardWidth();
    Bus.$on(this.SCREEN_SIZE_CHANGE, this.recalculateCardWidth);
    Bus.$on(this.TOGGLE_LIST_DISPLAY, this.recalculateCardWidth);
    Bus.$on(this.RECALCULATE_CARD_WIDTH, this.recalculateCardWidth);
    Bus.$on(this.GIVE_UP, () => {
      Bus.$off(this.CONFIRM);
    });
  },
  beforeDestroy() {
    Bus.$off(this.SCREEN_SIZE_CHANGE, this.recalculateCardWidth);
    Bus.$off(this.TOGGLE_LIST_DISPLAY, this.recalculateCardWidth);
    Bus.$off(this.RECALCULATE_CARD_WIDTH, this.recalculateCardWidth);
    Bus.$off(this.GIVE_UP);
  }
};
</script>

<style lang="less">
@import "~styles/variables.less";

@scale-card-height: 175px;

.diagnostic-scale {
  position: relative;
  .panel {
    text-align: left;
    .content {
      height: @scale-card-height + @card-vertical-margin * 2 + 5px * 2;
      &.extended {
        height: auto;
      }
    }
    .card {
      height: @scale-card-height;
      display: inline-block;
      margin: @card-vertical-margin @card-horizontal-margin;
      &.width-1-1, &.width-1-0 {
        width: calc(~"100% - @{card-horizontal-margin} * 2");
      }
      &.width-1-2 {
        width: calc(~"50% - @{card-horizontal-margin} * 2");
      }
      &.width-1-3 {
        width: calc(~"33.3333% - @{card-horizontal-margin} * 2");
      }
      &.width-1-4 {
        width: calc(~"25% - @{card-horizontal-margin} * 2");
      }
      &.width-1-5 {
        width: calc(~"20% - @{card-horizontal-margin} * 2");
      }
      &.width-1-6 {
        width: calc(~"16.6666% - @{card-horizontal-margin} * 2");
      }
      &.width-1-7 {
        width: calc(~"14.2857% - @{card-horizontal-margin} * 2");
      }
      &.width-1-8 {
        width: calc(~"12.5% - @{card-horizontal-margin} * 2");
      }
      &.width-1-9 {
        width: calc(~"11.1111% - @{card-horizontal-margin} * 2");
      }
      &.width-1-10 {
        width: calc(~"10% - @{card-horizontal-margin} * 2");
      }
      .text {
        position: absolute;
        font-size: @small-font-size;
        color: @light-font-color;
        .name {
          color: @font-color;
        }
        .value {
          padding-left: 10px;
          color: @light-font-color;
          .mark {
            padding-left: 10px;
            color: @button-color;
          }
        }
      }
      .first-line {
        left: 10px;
        top: 50px;
      }
      .second-line {
        left: 10px;
        top: 75px;
      }
      .third-line {
        left: 10px;
        top: 100px;
      }
      .fourth-line {
        left: 10px;
        top: 125px;
      }
      .fifth-line {
        left: 10px;
        top: 150px;
      }
    }
  }
}
</style>
