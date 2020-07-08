import {
  gettest,
  getPcustomersCpayments,
  getBiGender,
  getBirthDatePercent,
  getCustomerSource,
  getPPetsData,
  getCpaymentNum,
  getLateCpayments,
  getRunCpayments,
  getRevenueExpend,
  getPMedicinesBuy,
  getPetFrom,
  getGetCEMs,
  getDoctorTest,
  getZenLiaoCpayments
} from '@/api/bi'


const state = {
  logData: [],
  params: {
    currentPage: 1,
    pageSize: 10

  },
  currentPage: 1,
  pageSize: 10
}

const mutations = {
  SET_LOGDATA: (state, logData) => {
    state.logData = logData
  },
  SET_CURRENTPAGE: (state, currentPage) => {
    state.currentPage = currentPage
  },
  SET_PAGESIZE: (state, pageSize) => {
    state.pageSize = pageSize
  }
}

const actions = {
  // get user info
  gettest({
    commit
  }) {
    return new Promise((resolve, reject) => {
      gettest().then(response => {
        const {
          data
        } = response
        console.log(data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPcustomersCpayments({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getPcustomersCpayments(params).then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getBiGender({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getBiGender().then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getBirthDatePercent({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getBirthDatePercent().then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getCustomerSource({
    commit
  },params) {
    return new Promise((resolve, reject) => {
      getCustomerSource(params).then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPPetsData({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getPPetsData().then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getCpaymentNum({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getCpaymentNum(params).then(response => {
        
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        
        reject(error)
      })
    })
  },
  getLateCpayments({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getLateCpayments(params).then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getRunCpayments({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getRunCpayments(params).then(response => {
        console.log("流失客户的数据为",response);
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        console.log("流失客户报错信息为",error);
        reject(error)
      })
    })
  },
  getRevenueExpend({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getRevenueExpend(params).then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPMedicinesBuy({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getPMedicinesBuy(params).then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPetFrom({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getPetFrom(params).then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getGetCEMs({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getGetCEMs(params).then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getDoctorTest({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getDoctorTest(params).then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getZenLiaoCpayments({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getZenLiaoCpayments(params).then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
