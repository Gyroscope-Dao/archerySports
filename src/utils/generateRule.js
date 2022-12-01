import { putAction } from '@api/manage'

const ruleBaseURL = '/sys/fillRule/executeRuleByCode/'
const url = {
  rule: {
    simulationId_rule: ruleBaseURL + 'simulationId_rule',
    etpId_rule: ruleBaseURL + 'etpId_rule',
    orderId_rule: ruleBaseURL + 'orderId_rule',
    lotIdRule: ruleBaseURL + 'lotIdRule',
    productId_rule: ruleBaseURL + 'productId_rule',
    componentId_rule: ruleBaseURL + 'componentId_rule',
    local_date_rule: ruleBaseURL + 'local_date_rule',
    stuffId_rule: ruleBaseURL + 'stuffId_rule',
    second_supplierId_rule: ruleBaseURL + 'second_supplierId_rule',
    first_supplierId_rule: ruleBaseURL + 'first_supplierId_rule'
  }
}

export function getFirstSupplierId(obj) {
  putAction(url.rule.first_supplierId_rule, obj.model).then(res => {
    if (res.success) {
      obj.model.firstSupplierId = res.result
    }
  })
}

export function getTime(obj) {
  putAction(url.rule.local_date_rule, obj.model).then(res => {
    if (res.success) {
      obj.model.infUpdateTime = res.result
    }
  })
}

export function getStuffId(obj) {
  putAction(url.rule.stuffId_rule, obj.model).then(res => {
    if (res.success) {
      obj.model.stuffId = res.result
    }
  })
}


export function getSimulationId(obj) {
  putAction(url.rule.first_supplierId_rule, obj.model).then(res => {
    if (res.success) {
      obj.model.simulationId = res.result
    }
  })
}

export function getEtpId(obj) {
  putAction(url.rule.etpId_rule, obj.model).then(res => {
    if (res.success) {
      obj.model.etpId = res.result
    }
  })
}

export function getOrderId(obj) {
  putAction(url.rule.orderId_rule, obj.model).then(res => {
    if (res.success) {
      obj.model.orderId = res.result
    }
  })
}

export function getLotId(obj) {
  putAction(url.rule.lotIdRule, obj.model).then(res => {
    if (res.success) {
      obj.model.lotId = res.result
    }
  })
}

export function getProductId(obj) {
  putAction(url.rule.productId_rule, obj.model).then(res => {
    if (res.success) {
      obj.model.productId = res.result
    }
  })
}

export function getComponentId(obj) {
  putAction(url.rule.componentId_rule, obj.model).then(res => {
    if (res.success) {
      obj.model.componentId = res.result
    }
  })
}

export function getSecondSupplierId(obj) {
  putAction(url.rule.second_supplierId_rule, obj.model).then(res => {
    if (res.success) {
      obj.model.secondSupplierId = res.result
    }
  })
}


