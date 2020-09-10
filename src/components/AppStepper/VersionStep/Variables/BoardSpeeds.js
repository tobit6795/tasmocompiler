// microcontroller is an index of microcontroller array (MicrocontrollerVersion.js)
// microcontroller = -1 for all microcontrollers
const boardSpeed = [
  {
    name: '80MHz',
    value: '80000000L',
    microcontroller: -1,
    default: true,
  },
  {
    name: '160MHz',
    value: '160000000L',
    microcontroller: -1,
    default: false,
  },
  {
    name: '240MHz',
    value: '240000000L',
    microcontroller: 1,
    default: false,
  },
];

export default boardSpeed;
