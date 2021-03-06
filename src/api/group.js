/* eslint-disable quotes */
import { encapsulatePromise, getCommonRequest } from 'api/common.js';

// 获取分组信息
export function getGroupList(groupInfoCondition) {
  var request = Object.assign({}, getCommonRequest());
  if (groupInfoCondition === undefined) {
    request.groupInfoCond = {};
  } else {
    request.groupInfoCond = groupInfoCondition;
  }
  var url = '/pdms/queryGroupList';
  return encapsulatePromise(url, request);
};

// 获取指定课题的分组信息
export function getSubjectGroupList(groupInfoCondition, subjectId) {
  var request = Object.assign({}, getCommonRequest());
  if (groupInfoCondition === undefined) {
    request.groupInfoCond = {};
  } else {
    request.groupInfoCond = groupInfoCondition;
  }
  request.taskId = subjectId;
  var url = '/pdms/queryGroupInTask';
  return encapsulatePromise(url, request);
};

// 获取分组信息
export function getGroupInfo(groupInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.groupInfo = groupInfo;
  var url = '/pdms/queryGroupInfo';

  return encapsulatePromise(url, request);
};

// 修改分组信息
export function modifyGroupInfo(groupInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.groupInfo = groupInfo;
  var url = '/pdms/modGroupInfo';

  return encapsulatePromise(url, request);
};

// 新增分组
export function addGroup(groupInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.pageNo = 1;
  request.pageSize = 0;
  request.group = groupInfo;
  var url = '/pdms/addGroup';

  return encapsulatePromise(url, request);
};

// 删除分组
export function deleteGroup(groupIdList) {
  var request = Object.assign({}, getCommonRequest());
  request.pageNo = 1;
  request.pageSize = 0;
  request.group = groupIdList;
  var url = '/pdms/delGroup';

  return encapsulatePromise(url, request);
};

// 查看某个分组下的病患列表（或者取相反，即不在该分组下的病患列表）
export function getGroupMembers(groupCondition) {
  var request = Object.assign({}, getCommonRequest());
  request.pageSize = 0;
  request.pageNo = 1;
  request.patientGroupCond = groupCondition;
  var url = '/pdms/queryPatientList';

  return encapsulatePromise(url, request);
};

// 移出分组成员
export function removeGroupMembers(groupId, memberList) {
  var request = Object.assign({}, getCommonRequest());
  request.pageSize = 0;
  request.pageNo = 1;
  request.groupId = groupId;
  request.members = memberList;
  var url = '/pdms/delGroupMember';

  return encapsulatePromise(url, request);
};

// 向指定分组添加新成员
export function addGroupMembers(groupId, memberList) {
  var request = Object.assign({}, getCommonRequest());
  request.pageSize = 0;
  request.pageNo = 1;
  request.groupId = groupId;
  request.members = memberList;
  var url = '/pdms/addGroupMember';

  return encapsulatePromise(url, request);
};
