/* eslint-disable quotes */
import { baseUrl, encapsulatePromise, getCommonRequest } from 'api/common.js';

export function getPatientList(condition) {
  // condition 对象包含了查询参数，必须包含 type 属性
  var request = Object.assign({}, getCommonRequest());
  request.pageNo = 1;
  request.pageSize = 0;
  if ((condition instanceof Object) && condition.type) {
    request.patientCond = condition;
  }
  var url = baseUrl + '/pdms/queryPatientList';
  return encapsulatePromise(url, request);
};

export function getPatientInfo(patientId) {
  // 传进来的 patientId 可能是字符串，这里需要转化为数字
  var patientIdNum = parseInt(patientId, 10);
  var request = Object.assign({}, getCommonRequest());
  request.patientId = patientIdNum;
  var url = baseUrl + '/pdms/queryPatientPerson';

  return encapsulatePromise(url, request);
};

export function modifyPatientInfo(patientInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientInfo = patientInfo;
  var url = baseUrl + '/pdms/modPatientInfo';

  return encapsulatePromise(url, request);
};

// 新增患者
export function addPatientInfo(patientInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientInfo = patientInfo;
  var url = baseUrl + '/pdms/addPatientInfo';

  return encapsulatePromise(url, request);
};

// 获取一个简单的病患对象，仅包含该患者的几个基本信息
export function getPatientSimpleInfo(patientId) {
  var patientIdNum = parseInt(patientId, 10);
  var request = Object.assign({}, getCommonRequest());
  request.patientId = patientIdNum;
  var url = baseUrl + '/pdms/queryPatientInfo';

  return encapsulatePromise(url, request);
};

// 获取特定患者的所属分组信息
export function getPatientGroupInfo(patientInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientInfo = patientInfo;
  var url = baseUrl + '/pdms/queryPatientGroup';

  return encapsulatePromise(url, request);
};

// 获取特定患者的所属课题信息
export function getPatientSubjectInfo(patientId) {
  var request = Object.assign({}, getCommonRequest());
  request.patientId = patientId;
  var url = baseUrl + '/pdms/queryPatientTask';

  return encapsulatePromise(url, request);
};

export function modifyPatientDiseaseInfo(patientDiseaseInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientDiseaseInfo = patientDiseaseInfo;
  var url = baseUrl + '/pdms/modPatientDiseaseInfo';

  return encapsulatePromise(url, request);
};

export function getPatientMedHistoryList(patientId) {
  // 传进来的 patientId 可能是字符串，这里需要转化为数字
  var patientIdNum = parseInt(patientId, 10);
  var request = Object.assign({}, getCommonRequest());
  request.patientId = patientIdNum;
  var url = baseUrl + '/pdms/queryPatientMedHistoryList';

  return encapsulatePromise(url, request);
};

// 新增现病史
export function addPatientPresentHistory(presentHistory) {
  var request = Object.assign({}, getCommonRequest());
  request.patientHistory = presentHistory;
  var url = baseUrl + '/pdms/addPatientHistory';

  return encapsulatePromise(url, request);
};

// 修改现病史
export function modifyPatientPresentHistory(presentHistory) {
  var request = Object.assign({}, getCommonRequest());
  request.patientHistory = presentHistory;
  var url = baseUrl + '/pdms/modPatientHistory';

  return encapsulatePromise(url, request);
};

// 删除现病史
export function deletePatientPresentHistory(presentHistory) {
  var request = Object.assign({}, getCommonRequest());
  request.patientHistory = presentHistory;
  var url = baseUrl + '/pdms/delPatientHistory';

  return encapsulatePromise(url, request);
};

// v2.1 现病史 ↓
// 新增首发症状
export function addPatientFirstSymbol(firstSymbol) {
  var request = Object.assign({}, getCommonRequest());
  request.patientFirstSymbolModel = firstSymbol;
  var url = baseUrl + '/pdms/addPatientFirstSymbol';

  return encapsulatePromise(url, request);
};

// 修改首发症状
export function modPatientFirstSymbol(firstSymbol) {
  var request = Object.assign({}, getCommonRequest());
  request.patientFirstSymbolModel = firstSymbol;
  var url = baseUrl + '/pdms/modPatientFirstSymbol';

  return encapsulatePromise(url, request);
};

// 删除首发症状
export function deletePatientFirstSymbol(firstSymbol) {
  var request = Object.assign({}, getCommonRequest());
  request.patientFirstSymbolModel = firstSymbol;
  var url = baseUrl + '/pdms/delPatientFirstSymbol';

  return encapsulatePromise(url, request);
};

// 新增用药史
export function addPatientMedHistory(medHistory) {
  var request = Object.assign({}, getCommonRequest());
  request.patientMedHistory = medHistory;
  var url = baseUrl + '/pdms/addPatientMedHistory';

  return encapsulatePromise(url, request);
};

// 修改用药史
export function modifyPatientMedHistory(medHistory) {
  var request = Object.assign({}, getCommonRequest());
  request.patientMedHistory = medHistory;
  var url = baseUrl + '/pdms/modPatientMedHistory';

  return encapsulatePromise(url, request);
};

// 删除用药史
export function deletePatientMedHistory(medHistory) {
  var request = Object.assign({}, getCommonRequest());
  request.patientMedHistory = medHistory;
  var url = baseUrl + '/pdms/delPatientMedHistory';

  return encapsulatePromise(url, request);
};

// 新增既往史
export function addPatientDisease(patientDisease) {
  var request = Object.assign({}, getCommonRequest());
  request.patientDisease = patientDisease;
  var url = baseUrl + '/pdms/addPatientDisease';

  return encapsulatePromise(url, request);
};

// 修改既往史
export function modifyPatientDisease(patientDisease) {
  var request = Object.assign({}, getCommonRequest());
  request.patientDisease = patientDisease;
  var url = baseUrl + '/pdms/modPatientDisease';

  return encapsulatePromise(url, request);
};

// 删除既往史
export function deletePatientDisease(patientDisease) {
  var request = Object.assign({}, getCommonRequest());
  request.patientDisease = patientDisease;
  var url = baseUrl + '/pdms/delPatientDisease';

  return encapsulatePromise(url, request);
};

// 新增家族史
export function addPatientFamily(patientFamily) {
  var request = Object.assign({}, getCommonRequest());
  request.patientFamily = patientFamily;
  var url = baseUrl + '/pdms/addPatientFamily';

  return encapsulatePromise(url, request);
};

// 修改家族史
export function modifyPatientFamily(patientFamily) {
  var request = Object.assign({}, getCommonRequest());
  request.patientFamily = patientFamily;
  var url = baseUrl + '/pdms/modPatientFamily';

  return encapsulatePromise(url, request);
};

// 删除家族史
export function deletePatientFamily(patientFamily) {
  var request = Object.assign({}, getCommonRequest());
  request.patientFamily = patientFamily;
  var url = baseUrl + '/pdms/delPatientFamily';

  return encapsulatePromise(url, request);
};

// 新增锻炼史
export function addPatientExercise(patientExercise) {
  var request = Object.assign({}, getCommonRequest());
  request.patientExercise = patientExercise;
  var url = baseUrl + '/pdms/addPatientExercise';

  return encapsulatePromise(url, request);
};

// 修改锻炼史
export function modifyPatientExercise(patientExercise) {
  var request = Object.assign({}, getCommonRequest());
  request.patientExercise = patientExercise;
  var url = baseUrl + '/pdms/modPatientExercise';

  return encapsulatePromise(url, request);
};

// 删除锻炼史
export function deletePatientExercise(patientExercise) {
  var request = Object.assign({}, getCommonRequest());
  request.patientExercise = patientExercise;
  var url = baseUrl + '/pdms/delPatientExercise';

  return encapsulatePromise(url, request);
};

// 新增吸烟史
export function addPatientSmoke(patientSmoke) {
  var request = Object.assign({}, getCommonRequest());
  request.patientSmoke = patientSmoke;
  var url = baseUrl + '/pdms/addPatientSmoke';

  return encapsulatePromise(url, request);
};

// 修改吸烟史
export function modifyPatientSmoke(patientSmoke) {
  var request = Object.assign({}, getCommonRequest());
  request.patientSmoke = patientSmoke;
  var url = baseUrl + '/pdms/modPatientSmoke';

  return encapsulatePromise(url, request);
};

// 删除吸烟史
export function deletePatientSmoke(patientSmoke) {
  var request = Object.assign({}, getCommonRequest());
  request.patientSmoke = patientSmoke;
  var url = baseUrl + '/pdms/delPatientSmoke';

  return encapsulatePromise(url, request);
};

// 新增饮酒史
export function addPatientWine(patientWine) {
  var request = Object.assign({}, getCommonRequest());
  request.patientWine = patientWine;
  var url = baseUrl + '/pdms/addPatientWine';

  return encapsulatePromise(url, request);
};

// 修改饮酒史
export function modifyPatientWine(patientWine) {
  var request = Object.assign({}, getCommonRequest());
  request.patientWine = patientWine;
  var url = baseUrl + '/pdms/modPatientWine';

  return encapsulatePromise(url, request);
};

// 删除饮酒史
export function deletePatientWine(patientWine) {
  var request = Object.assign({}, getCommonRequest());
  request.patientWine = patientWine;
  var url = baseUrl + '/pdms/delPatientWine';

  return encapsulatePromise(url, request);
};

// 新增喝茶史
export function addPatientTea(patientTea) {
  var request = Object.assign({}, getCommonRequest());
  request.patientTea = patientTea;
  var url = baseUrl + '/pdms/addPatientTea';

  return encapsulatePromise(url, request);
};

// 修改喝茶史
export function modifyPatientTea(patientTea) {
  var request = Object.assign({}, getCommonRequest());
  request.patientTea = patientTea;
  var url = baseUrl + '/pdms/modPatientTea';

  return encapsulatePromise(url, request);
};

// 删除喝茶史
export function deletePatientTea(patientTea) {
  var request = Object.assign({}, getCommonRequest());
  request.patientTea = patientTea;
  var url = baseUrl + '/pdms/delPatientTea';

  return encapsulatePromise(url, request);
};

// 新增咖啡史
export function addPatientCoffee(patientCoffee) {
  var request = Object.assign({}, getCommonRequest());
  request.patientCoffee = patientCoffee;
  var url = baseUrl + '/pdms/addPatientCoffee';

  return encapsulatePromise(url, request);
};

// 修改咖啡史
export function modifyPatientCoffee(patientCoffee) {
  var request = Object.assign({}, getCommonRequest());
  request.patientCoffee = patientCoffee;
  var url = baseUrl + '/pdms/modPatientCoffee';

  return encapsulatePromise(url, request);
};

// 删除咖啡史
export function deletePatientCoffee(patientCoffee) {
  var request = Object.assign({}, getCommonRequest());
  request.patientCoffee = patientCoffee;
  var url = baseUrl + '/pdms/delPatientCoffee';

  return encapsulatePromise(url, request);
};

// 新增毒物接触史
export function addPatientToxicExposure(toxicExposure) {
  var request = Object.assign({}, getCommonRequest());
  request.patientCideexposed = toxicExposure;
  var url = baseUrl + '/pdms/addPatientCideexposed';

  return encapsulatePromise(url, request);
};

// 修改毒物接触史
export function modifyPatientToxicExposure(toxicExposure) {
  var request = Object.assign({}, getCommonRequest());
  request.patientCideexposed = toxicExposure;
  var url = baseUrl + '/pdms/modPatientCideexposed';

  return encapsulatePromise(url, request);
};

// 删除毒物接触史
export function deletePatientToxicExposure(toxicExposure) {
  var request = Object.assign({}, getCommonRequest());
  request.patientCideexposed = toxicExposure;
  var url = baseUrl + '/pdms/delPatientCideexposed';

  return encapsulatePromise(url, request);
};

// 新增诊断信息-基本情况
export function addDiagnosticBasic(diagnosticBasic) {
  var request = Object.assign({}, getCommonRequest());
  request.patientCase = diagnosticBasic;
  var url = baseUrl + '/pdms/addPatientCase';

  return encapsulatePromise(url, request);
};

// 修改诊断信息-基本情况
export function modifyDiagnosticBasic(diagnosticBasic) {
  var request = Object.assign({}, getCommonRequest());
  request.patientCase = diagnosticBasic;
  var url = baseUrl + '/pdms/modPatientCase';

  return encapsulatePromise(url, request);
};

// 删除诊断信息
export function deleteDiagnosticInfo(diagnosticInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientCase = diagnosticInfo;
  var url = baseUrl + '/pdms/delPatientCase';
  return encapsulatePromise(url, request);
};

// 修改诊断信息-病症情况（新增也用这个接口）
export function modifyDiagnosticDisease(diagnosticDisease) {
  var request = Object.assign({}, getCommonRequest());
  request.patientDisease = diagnosticDisease;
  var url = baseUrl + '/pdms/modPatientSymptom';

  return encapsulatePromise(url, request);
};

// 诊断记录 主诉症状
// 新增主诉症状
export function addPatientSymptom(complaintsInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientSymptomModel = complaintsInfo;
  var url = baseUrl + '/pdms/addPatientSymptom';

  return encapsulatePromise(url, request);
};

// 修改主诉症状
export function modPatientSymptom(complaintsInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientSymptomModel = complaintsInfo;
  var url = baseUrl + '/pdms/modPatientSymptom';

  return encapsulatePromise(url, request);
};

// 删除主诉症状
export function delPatientSymptom(complaintsInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientSymptomModel = complaintsInfo;
  var url = baseUrl + '/pdms/delPatientSymptom';

  return encapsulatePromise(url, request);
};

// 获取患者诊断列表
export function getPatientCaseList(patientId) {
  // 传进来的 patientId 可能是字符串，这里需要转化为数字
  var patientIdNum = parseInt(patientId, 10);
  var request = Object.assign({}, getCommonRequest());
  request.patientId = patientIdNum;
  request.pageSize = 0;
  request.pageNo = 1;
  var url = baseUrl + '/pdms/queryPatientCaseList';
  return encapsulatePromise(url, request);
};

// 获取患者诊断详情
export function getPatientCase(patientId, patientCaseId) {
  var patientIdNum = parseInt(patientId, 10);
  var request = Object.assign({}, getCommonRequest());
  request.patientId = patientIdNum;
  request.patientCaseId = patientCaseId;
  var url = baseUrl + '/pdms/queryPatientCase';

  return encapsulatePromise(url, request);
};

// 将诊断信息进行归档
export function archivePatientCase(patientCaseId) {
  var request = Object.assign({}, getCommonRequest());
  request.patientCaseId = patientCaseId;
  var url = baseUrl + '/pdms/archivePatientCase';

  return encapsulatePromise(url, request);
};

// 新增药物方案
export function addPatientMedicine(patientMedicine) {
  var request = Object.assign({}, getCommonRequest());
  request.patientMedicine = patientMedicine;
  var url = baseUrl + '/pdms/addPatientMedicine';

  return encapsulatePromise(url, request);
};

// 修改药物方案
export function modifyPatientMedicine(patientMedicine) {
  var request = Object.assign({}, getCommonRequest());
  request.patientMedicine = patientMedicine;
  var url = baseUrl + '/pdms/modPatientMedicine';

  return encapsulatePromise(url, request);
};

// 删除药物方案
export function deletePatientMedicine(patientMedicine) {
  var request = Object.assign({}, getCommonRequest());
  request.patientMedicine = patientMedicine;
  var url = baseUrl + '/pdms/delPatientMedicine';

  return encapsulatePromise(url, request);
};

// 查看某次术前评估详情
export function getPreEvaluation(preEvaluationId) {
  preEvaluationId = parseInt(preEvaluationId, 10);
  var request = Object.assign({}, getCommonRequest());
  request.preopsInfoId = preEvaluationId;
  var url = baseUrl + '/pdms/queryPatientPreopsDetail';

  return encapsulatePromise(url, request);
};

// 新增术前评估
export function addPreEvaluation(preEvaluation) {
  var request = Object.assign({}, getCommonRequest());
  request.patientPreops = preEvaluation;
  var url = baseUrl + '/pdms/addPatientPreops';

  return encapsulatePromise(url, request);
};

// 修改术前评估
export function modifyPreEvaluation(preEvaluation) {
  var request = Object.assign({}, getCommonRequest());
  request.patientPreops = preEvaluation;
  var url = baseUrl + '/pdms/modPatientPreops';

  return encapsulatePromise(url, request);
};

// 删除术前评估
export function deletePreEvaluation(preEvaluation) {
  var request = Object.assign({}, getCommonRequest());
  request.patientPreops = preEvaluation;
  var url = baseUrl + '/pdms/delPatientPreops';

  return encapsulatePromise(url, request);
};

// 新增手术方案
export function addSurgicalMethod(surgicalMethod) {
  var request = Object.assign({}, getCommonRequest());
  request.patientTreatment = surgicalMethod;
  var url = baseUrl + '/pdms/addPatientTreatment';

  return encapsulatePromise(url, request);
};

// 修改手术方案
export function modifySurgicalMethod(surgicalMethod) {
  var request = Object.assign({}, getCommonRequest());
  request.patientTreatment = surgicalMethod;
  var url = baseUrl + '/pdms/modPatientTreatment';

  return encapsulatePromise(url, request);
};

// 删除手术方案
export function deleteSurgicalMethod(surgicalMethod) {
  var request = Object.assign({}, getCommonRequest());
  request.patientTreatment = surgicalMethod;
  var url = baseUrl + '/pdms/delPatientTreatment';

  return encapsulatePromise(url, request);
};

// 新增术后并发症
export function addOperativeCompliation(operativeComplication) {
  var request = Object.assign({}, getCommonRequest());
  request.patientComplication = operativeComplication;
  var url = baseUrl + '/pdms/addPatientComplication';

  return encapsulatePromise(url, request);
};

// 修改术后并发症
export function modifyOperativeCompliation(operativeComplication) {
  var request = Object.assign({}, getCommonRequest());
  request.patientComplication = operativeComplication;
  var url = baseUrl + '/pdms/modPatientComplication';

  return encapsulatePromise(url, request);
};

// 删除术后并发症
export function deleteOperativeCompliation(operativeComplication) {
  var request = Object.assign({}, getCommonRequest());
  request.patientComplication = operativeComplication;
  var url = baseUrl + '/pdms/delPatientComplication';

  return encapsulatePromise(url, request);
};

// 查看首次程控记录详情
export function getDbsFirstInfo(dbsFirstId) {
  dbsFirstId = parseInt(dbsFirstId, 10);
  var request = Object.assign({}, getCommonRequest());
  request.patientDbsFirstId = dbsFirstId;
  var url = baseUrl + '/pdms/queryPatientDbsFirstDetail';

  return encapsulatePromise(url, request);
};

// 新增首次程控记录详情
export function addDbsFirstInfo(dbsFirstInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientDbsFirst = dbsFirstInfo;
  var url = baseUrl + '/pdms/addPatientDbsFirst';

  return encapsulatePromise(url, request);
};

// 修改首次程控记录详情
export function modifyDbsFirstInfo(dbsFirstInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientDbsFirst = dbsFirstInfo;
  var url = baseUrl + '/pdms/modPatientDbsFirst';

  return encapsulatePromise(url, request);
};

// 删除首次程控记录详情
export function deleteDbsFirstInfo(dbsFirstInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientDbsFirst = dbsFirstInfo;
  var url = baseUrl + '/pdms/delPatientDbsFirst';

  return encapsulatePromise(url, request);
};

// 查看非某次程控记录详情
export function getDbsFollowInfo(patientId, dbsFollowId) {
  patientId = parseInt(patientId, 10);
  dbsFollowId = parseInt(dbsFollowId, 10);
  var request = Object.assign({}, getCommonRequest());
  request.patientId = patientId;
  request.patientDbsFollowId = dbsFollowId;
  var url = baseUrl + '/pdms/queryPatientDbsFollowDetail';

  return encapsulatePromise(url, request);
};

// 新增非首次程控记录详情
export function addDbsFollowInfo(dbsFollowInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientDbsFollow = dbsFollowInfo;
  var url = baseUrl + '/pdms/addPatientDbsFollow';

  return encapsulatePromise(url, request);
};

// 修改非首次程控记录详情
export function modifyDbsFollowInfo(dbsFollowInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientDbsFollow = dbsFollowInfo;
  var url = baseUrl + '/pdms/modPatientDbsFollow';

  return encapsulatePromise(url, request);
};

// 删除非首次程控记录详情
export function deleteDbsFollowInfo(dbsFollowInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientDbsFollow = dbsFollowInfo;
  var url = baseUrl + '/pdms/delPatientDbsFollow';

  return encapsulatePromise(url, request);
};

// 查看上次程控信息（包括记录时间 和 调整后参数）
export function getLastDbsInfo(patientId, patientCaseId) {
  patientId = parseInt(patientId, 10);
  var request = Object.assign({}, getCommonRequest());
  request.patientId = patientId;
  request.patientCaseId = patientCaseId;
  var url = baseUrl + '/pdms/queryLastPatientDbsParms';

  return encapsulatePromise(url, request);
};

// 新增医学量表
export function addScaleInfo(patientScale) {
  var request = Object.assign({}, getCommonRequest());
  request.patientScale = patientScale;
  var url = baseUrl + '/pdms/addPatientScaleInfo';

  return encapsulatePromise(url, request);
};

// 修改医学量表
export function modifyScaleInfo(patientScale) {
  var request = Object.assign({}, getCommonRequest());
  request.patientScale = patientScale;
  var url = baseUrl + '/pdms/modPatientScaleInfo';

  return encapsulatePromise(url, request);
};
// 删除医学量表
export function deleteScaleInfo(patientScale) {
  var request = Object.assign({}, getCommonRequest());
  request.patientScale = patientScale;
  var url = baseUrl + '/pdms/delPatientScaleInfo';

  return encapsulatePromise(url, request);
};

// 修改神经系统检查
export function modifyNervouSystem(patientSpephysical) {
  var request = Object.assign({}, getCommonRequest());
  request.patientSpephysical = patientSpephysical;
  var url = baseUrl + '/pdms/modPatientSpephysical';

  return encapsulatePromise(url, request);
};

// 新增神经系统检查
export function addNervouSystem(patientSpephysical) {
  var request = Object.assign({}, getCommonRequest());
  request.patientSpephysical = patientSpephysical;
  var url = baseUrl + '/pdms/addPatientSpephysical';

  return encapsulatePromise(url, request);
};

// 删除神经系统检查
export function delNervouSystem(patientSpephysical) {
  var request = Object.assign({}, getCommonRequest());
  request.patientSpephysical = patientSpephysical;
  var url = baseUrl + '/pdms/delPatientSpephysical';

  return encapsulatePromise(url, request);
};

// 修改基因检查
export function modifyGeneCheck(patientGene) {
  var request = Object.assign({}, getCommonRequest());
  request.patientGene = patientGene;
  var url = baseUrl + '/pdms/modPatientGene';

  return encapsulatePromise(url, request);
};

// 新增基因检查
export function addGeneCheck(patientGene) {
  var request = Object.assign({}, getCommonRequest());
  request.patientGene = patientGene;
  var url = baseUrl + '/pdms/addPatientGene';

  return encapsulatePromise(url, request);
};
// 删除基因检查
export function deleteGeneCheck(patientGene) {
  var request = Object.assign({}, getCommonRequest());
  request.patientGene = patientGene;
  var url = baseUrl + '/pdms/delPatientGene';

  return encapsulatePromise(url, request);
};

// 新增生化指标
export function addBiochemical(patientBioexam) {
  var request = Object.assign({}, getCommonRequest());
  request.patientBioexam = patientBioexam;
  var url = baseUrl + '/pdms/addBioexam';

  return encapsulatePromise(url, request);
};

// 修改生化指标
export function modifyBiochemical(patientBioexam) {
  var request = Object.assign({}, getCommonRequest());
  request.patientBioexam = patientBioexam;
  var url = baseUrl + '/pdms/modBioexam';

  return encapsulatePromise(url, request);
};

// 删除生化指标
export function deleteBiochemical(patientBioexam) {
  var request = Object.assign({}, getCommonRequest());
  request.patientBioexam = patientBioexam;
  var url = baseUrl + '/pdms/delBioexam';

  return encapsulatePromise(url, request);
};

// 新增肌电图
export function addEmg(patientElecTroGram) {
  var request = Object.assign({}, getCommonRequest());
  request.patientElecTroGram = patientElecTroGram;
  var url = baseUrl + '/pdms/addPatElecTroGram';

  return encapsulatePromise(url, request);
};

// 修改肌电图
export function modEmg(patientElecTroGram) {
  var request = Object.assign({}, getCommonRequest());
  request.patientElecTroGram = patientElecTroGram;
  var url = baseUrl + '/pdms/modPatElecTroGram';

  return encapsulatePromise(url, request);
};

// 删除肌电图
export function deleteEmg(patientElecTroGram) {
  var request = Object.assign({}, getCommonRequest());
  request.patientElecTroGram = patientElecTroGram;
  var url = baseUrl + '/pdms/delPatElecTroGram';

  return encapsulatePromise(url, request);
};

// 新增医学影像
export function addImage(imageInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientImageReq = imageInfo;
  var url = baseUrl + '/pdms/addPatientImage';

  return encapsulatePromise(url, request);
};

// 修改医学影像
export function modifyImage(imageInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientImageReq = imageInfo;
  var url = baseUrl + '/pdms/modPatientImage';

  return encapsulatePromise(url, request);
};

// 删除医学影像
export function deleteImage(imageInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.patientImageReq = imageInfo;
  var url = baseUrl + '/pdms/delPatientImage';

  return encapsulatePromise(url, request);
};

// 修改生命体征
export function modVitalSigns(patientCase) {
  var request = Object.assign({}, getCommonRequest());
  request.patientCase = patientCase;
  var url = baseUrl + '/pdms/modPatientCase';

  return encapsulatePromise(url, request);
};

// 综合查询
export function queryPatientsByCondition(condition) {
  var request = Object.assign({}, getCommonRequest());
  var url = baseUrl + '/pdms/integratedQuery';
  if (condition) {
    request.integratedQueryCond = condition;
  }
  return encapsulatePromise(url, request);
};

// 新增物理治疗
export function addPhysiontherapy(patientPhytheTms) {
  var request = Object.assign({}, getCommonRequest());
  request.patientPhytheTms = patientPhytheTms;
  var url = baseUrl + '/pdms/addPatientPhytheTms';

  return encapsulatePromise(url, request);
};

// 修改物理治疗
export function modifyPhysiontherapy(patientPhytheTms) {
  var request = Object.assign({}, getCommonRequest());
  request.patientPhytheTms = patientPhytheTms;
  var url = baseUrl + '/pdms/modPatientPhytheTms';

  return encapsulatePromise(url, request);
};

// 删除物理治疗
export function deletePhysiontherapy(patientPhytheTms) {
  var request = Object.assign({}, getCommonRequest());
  request.patientPhytheTms = patientPhytheTms;
  var url = baseUrl + '/pdms/delPatientPhytheTms';

  return encapsulatePromise(url, request);
};
