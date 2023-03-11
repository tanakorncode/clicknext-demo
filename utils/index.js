import Swal from 'sweetalert2'

/**
 * merge object
 * @param {Object} oldObject
 * @param {Object} updatedProperties
 */
const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  }
}

/**
     * แสดง Dialog
     * @param {String} msg ข้อความ
     */
const alertSuccess = (msg = '') => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })

  Toast.fire({
    icon: 'success',
    title: msg,
  })
}

const getColor = (state) => {
  if (state === 'withdraw') return 'red'
  else return 'green'
}

export {
  updateObject,
  alertSuccess,
  getColor
}
