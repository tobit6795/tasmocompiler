// microcontroller is an index of microcontroller array (MicrocontrollerVersion.js)
const coreVersions = [
  {
    name: '2.6.1',
    microcontroller: 0,
    value: { platform: 'core_2_6_1', mem_prefix: 'eagle.flash.' },
    default: false,
  },
  {
    name: '2.7.1',
    microcontroller: 0,
    value: { platform: 'core_2_7_1', mem_prefix: 'eagle.flash.' },
    default: false,
  },
  {
    name: '2.7.3',
    microcontroller: 0,
    value: { platform: 'core_2_7_3', mem_prefix: 'eagle.flash.' },
    default: false,
  },
  {
    name: '2.7.4',
    microcontroller: 0,
    value: { platform: 'core_2_7_4', mem_prefix: 'eagle.flash.' },
    default: true,
  },
  {
    name: '1.12.4',
    microcontroller: 1,
    value: { platform: 'core_1_12_4', mem_prefix: 'eagle.flash.' },
    default: false,
  },
  {
    name: '2.0.0',
    microcontroller: 1,
    value: { platform: 'core_2_0_0', mem_prefix: 'eagle.flash.' },
    default: true,
  },
];

export default coreVersions;
