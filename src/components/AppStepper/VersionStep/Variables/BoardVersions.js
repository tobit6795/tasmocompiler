// microcontroller is an index of microcontroller array (MicrocontrollerVersion.js)
const boardVersions = [
  {
    name: 'Sonoffs (1MB)',
    microcontroller: 0,
    value: { mem: 1, board: 'esp01_1m' },
    default: true,
  },
  {
    name: 'NodeMCU (4MB)',
    microcontroller: 0,
    value: { mem: 4, board: 'nodemcuv2' },
    default: false,
  },
  {
    name: 'Wemos D1 Mini (4MB)',
    microcontroller: 0,
    value: { mem: 4, board: 'd1_mini' },
    default: false,
  },
  {
    name: 'ESP32',
    microcontroller: 1,
    value: { mem: 4, board: 'esp32dev' },
    default: true,
  },
  {
    name: 'ESP32 Camera',
    microcontroller: 1,
    value: { mem: 4, board: 'esp32cam' },
    default: false,
  },
];

export default boardVersions;
