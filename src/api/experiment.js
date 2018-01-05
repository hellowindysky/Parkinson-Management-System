/* eslint-disable quotes */
import { encapsulatePromise, getCommonRequest } from 'api/common.js';

// 查询所属医生/治疗者/评估者
export function queryExperimentMember(subjectId, experimentGroupId, roleType) {
  var request = Object.assign({}, getCommonRequest());
  if (subjectId) {
    request.taskInfoId = subjectId;
  }
  if (experimentGroupId) {
    request.taskGroupId = experimentGroupId;
  }
  if (roleType) {
    // 0.所属医生 1.治疗者 2.评估者  如果没有该参数则三个数组一起返回
    request.taskRoleType = roleType;
  }
  var url = '/pdms/queryTreaterAndAssessor';
  return encapsulatePromise(url, request);
};
