const data1 = {
  batch_inf: '到货批次表',
  enterprise_inf: '往来单位信息表',
  first_component_inventory: '一级核心EEE库存与DDD能力表',
  first_keyprocess_inf: '一级AAA瓶颈工序',
  first_purchase_from_second: '二级DDD表',
  first_supplier_inf: '一级AAA表',
  orderdetail: '订单跟踪信息表',
  second_ability_inf: '二级产存检运能力表',
  second_supplier_inf: '二级AAA表',
  sys_depart: '部门表',
  sys_user: '工作人员表',
  order_inf: '订单表',
  product_inf: '物料信息表',
  component_inf: '核心EEE表',
  first_purchase: '一级DDD表',
  simulation_inf: '仿真记录与文件表'
}
const data2 = {
  create_time: '创建时间',
  stuff_id: '人员编号',
  stuff_name: '姓名',
  department: '部门',
  order_id: '订单编号',
  update_time: '录入时间',
  delivery_date: '交货期',
  product_id: '物料编号',
  purchase_cycle: 'BBB周期',
  first_supplier_id: 'AAA编号',
  first_purchaseid: '一级DDD编号',
  purchase_time: 'DDD时间',
  bottleneck_sid: 'DDD瓶颈AAA',
  purchase_percent: 'DDD比例',
  purchase_quantity: 'DDD数量',
  purchase_lead_time: 'DDD提前期',
  real_delivery_date: '实际交货期',
  product_name: '物料名称',
  product_type: '物料类别',
  product_specification: '物料规格',
  product_unit: '计量单位',
  product_nature: '物料性质',
  supplier_name: 'AAA名称',
  first_supplier_id: '一级AAA编号',
  supplier_simple_name: 'AAA简称',
  supplier_address: 'AAA地址',
  contact: '联系人',
  contact_num: '联系电话',
  tax_id: '税号',
  private_enterprise: '是否民口企业',
  battleneck_supplier: '是否瓶颈AAA',
  certification: 'AAA资质',
  legal_person: '法定代表人',
  post_code: '邮编',
  bank_name: '开户行名称',
  bank_account: '开户账号',
  etp_id: '往来单位信息 id',
  is_product: '是否生产瓶颈AAA',
  is_purchase: '是否DDD瓶颈AAA',
  estab_year: '成立年份',
  corporate_credit: '企业征信',
  product_stock: '物料库存',
  production_lot: '生产批量',
  day_pro_lot: '日均产量',
  max_day_pro_lot: '日最大生产量',
  production_cycle: '生产周期（天）',
  check_time_A: 'A 组检验周期（天）',
  check_time_B: 'B 组检验周期（天）',
  check_time_C: 'C 组检验周期（天）',
  check_time_D: 'D 组检验周期（天）',
  check_time_a: 'A 组检验周期（天）',
  check_time_b: 'B 组检验周期（天）',
  check_time_c: 'C 组检验周期（天）',
  check_time_d: 'D 组检验周期（天）',
  transport_time_description: '检验周期（天）逻辑关系',
  transport_time: 'ys周期（天）',
  com1_inf_id: '核心EEE编号',
  first_supplier_id: '一级AAA编号',
  stock_quantity: '库存数量',
  purchase_lead_time: 'DDD周期（天）',
  second_supplier_id: '二级AAA编号',
  component_id: '核心EEE编号',
  delivery_date: '约定交货期限',
  actual_delivery_time: '实际交货日期',
  component_name: 'EEE名称',
  component_specification: 'EEE规格',
  component_unit: '计量单位',
  component_nature: 'EEE性质',
  legal_person: '法定代表人',
  dailyproductioncapacity: '日均产量',
  admin_regin: '行政区域',
  permit_id: '许可证编号',
  lot_id: '批次编号',
  arrival_quantity: '到货数量',
  arrival_data: '到货时间',
  pass_rate: '批次合格率',
  batch_number: '总批次量',
  keyprocess: '瓶颈工序名称',
  simulation_id: '仿真编号',
  simulation_purpose: '仿真目的',
  smulation_version: '版本',
  report_file: '报告文件',
  model_file: '模型文件',
  input_time: '仿真时间',
  purchase1_id: 'DDD订单号',
  supply_cycle: 'CCC周期',
  first_purchase_id: '一级DDD编号',
  sys_org_code: '部门编号',
  create_by: '创建人',
  ept_id: '往来单位编号',
  inf_update_time: '信息更新时间',
  update_by: '更新人',
  component_type: 'EEE类别',
  check_time: '生产周期（天）',
  daily_production_capacity: '日均产量',
  address: '地址',
  del_flag: '删除标记',
  depart_name: '部门名称',
  depart_name_en   :'英文名',
  depart_name_abbr :'缩写',
  depart_order: '排序',
  description: '描述',
  fax: '传真',
  memo: '备注',
  mobile: '手机',
  org_category: '机构类别',
  org_code: '机构编号',
  org_type: '机构类型',
  parent_id: '父机构id',
  qywx_identifier: '对接企业微信的ID',
  status: '状态',
  username: '登录账号',
  realname: '真实姓名',
  password: '密码',
  salt: 'md5密码盐',
  avatar: '头像',
  birthday: '生日',
  sex: '性别',
  email: '电子邮件',
  phone: '电话',
  third_id: '第三方登录的唯一标识',
  third_type: '第三方类型',
  activiti_sync: '同步工作流引擎',
  work_no: '工号',
  post: '职务',
  telephone: '座机号',
  user_identity: '身份',
  depart_ids: '负责部门',
  rel_tenant_ids: '多租户标识',
  client_id: '设备ID'
}

export const CHTableName = new Map(Object.entries(data1))
export const CHTableField = new Map(Object.entries(data2))
