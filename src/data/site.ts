/**
 * Toàn bộ nội dung có thể thay đổi của website nằm trong file này.
 * Thông tin liên hệ / địa chỉ lấy đúng theo biển hiệu và nhãn dán của tiệm.
 * Những mục đánh dấu TODO là số liệu tạm, chủ tiệm cần xác nhận lại.
 */

export const shop = {
  name: 'Thảo Thương',
  suffix: 'Bakery',
  since: 2023, // TODO: xác nhận năm mở tiệm
  services: '',
  address: '503 QL1A, Ninh Phạm, Quảng Ninh, Quảng Xương, Thanh Hoá',
  landmark: 'Ngã ba Cống Trúc',
  phone: '0976 608 474',
  phoneRaw: '0976608474',
  zalo: 'https://zalo.me/0976608474',
  facebook: 'https://www.facebook.com/search/top?q=th%E1%BA%A3o%20th%C6%B0%C6%A1ng%20bakery',
  maps: 'https://www.google.com/maps/search/?api=1&query=503+QL1A+Ninh+Ph%E1%BA%A1m+Qu%E1%BA%A3ng+X%C6%B0%C6%A1ng+Thanh+H%C3%B3a',
  hours: [
    { d: 'Thứ 2 – Thứ 7', t: '6:00 – 21:30' }, // TODO
    { d: 'Chủ nhật', t: '6:00 – 22:00' }, // TODO
  ],
  leadTime: 'Đặt trước tối thiểu ',
  delivery: 'Giao trong bán kính 10km quanh ngã ba Cống Trúc', // TODO
} as const

export type CatId = 'birthday' | 'minimal' | 'custom' | 'kids' | 'celebration'

export const categories: {
  id: CatId
  name: string
  en: string
  desc: string
  cover: string
  ar: number
}[] = [
  {
    id: 'birthday',
    name: 'Bánh sinh nhật',
    en: 'Birthday',
    desc: 'Cốt bông lan, kem tươi, hoa bắt tay. Mẫu quen thuộc nhất của tiệm.',
    cover: 'cakes/cake-01',
    ar: 1,
  },
  {
    id: 'minimal',
    name: 'Bánh tối giản',
    en: 'Minimal',
    desc: 'Một màu kem, một dải drip, một cái nơ. Ít thứ nhưng phải sạch nét.',
    cover: 'cakes/cake-04',
    ar: 1212 / 1280,
  },
  {
    id: 'custom',
    name: 'Bánh vẽ tay',
    en: 'Custom',
    desc: 'Gửi ảnh, gửi câu đùa của cả hội. Vẽ thẳng lên mặt kem bằng chocolate.',
    cover: 'cakes/cake-03',
    ar: 1,
  },
  {
    id: 'kids',
    name: 'Bánh cho bé',
    en: 'Kids',
    desc: 'Bông lan trứng muối, nhân vật hoạt hình, nơ ruy băng. Bé chọn, mẹ gật.',
    cover: 'cakes/cake-09',
    ar: 1136 / 1280,
  },
  {
    id: 'celebration',
    name: 'Bánh lễ & kỷ niệm',
    en: 'Celebration',
    desc: 'Cưới hỏi, nạp tài, 20/10, kỷ niệm ngày cưới. Trang trọng mà vẫn ấm.',
    cover: 'cakes/cake-13',
    ar: 1125 / 1371,
  },
]

export type Cake = {
  id: string
  img: string
  ar: number
  name: string
  /** dòng chữ thật đã được bắt kem lên đế bánh này */
  msg: string
  cat: CatId
  note: string
  from: number
}

export const cakes: Cake[] = [
  {
    id: 'c01',
    img: 'cakes/cake-01',
    ar: 1,
    name: 'Kem sọc & hoa lê',
    msg: 'happy birth day Mom iu',
    cat: 'birthday',
    note: 'Thân bánh vuốt sọc dọc, hoa bắt kem hồng đậm hồng nhạt xen nhau, rắc châu trắng.',
    from: 210,
  },
  {
    id: 'c02',
    img: 'cakes/cake-02',
    ar: 1,
    name: 'Sân cỏ số 10',
    msg: 'Chúc mừng sinh nhật Lê Văn Giáp 11 tuổi',
    cat: 'kids',
    note: 'Bắt cỏ hai tông xanh, bóng nhựa và cúp vàng cắm nổi. Mẫu các bạn nam hay chọn.',
    from: 225,
  },
  {
    id: 'c03',
    img: 'cakes/cake-03',
    ar: 1,
    name: 'Chân dung cô giáo',
    msg: 'Chúc Phú đậu viên chức',
    cat: 'custom',
    note: 'Vẽ tay bằng chocolate đen trên nền kem trắng. Gửi ảnh trước một ngày là vẽ được.',
    from: 255,
  },
  {
    id: 'c04',
    img: 'cakes/cake-04',
    ar: 1212 / 1280,
    name: 'Drip hồng & nơ',
    msg: 'Happy birth day Hà Trang',
    cat: 'minimal',
    note: 'Kem trắng, drip hồng nhạt chảy đều mép, mấy cái nơ bắt nhỏ xíu quanh thân.',
    from: 190,
  },
  {
    id: 'c05',
    img: 'cakes/cake-05',
    ar: 1196 / 1280,
    name: 'Cầm lấy mà đi',
    msg: 'Cầm lấy mà đi sinh nhật',
    cat: 'custom',
    note: 'Mặt cười vẽ nguệch ngoạc, kẹp thêm tờ tiền thật. Khách trẻ đặt tặng bạn thân.',
    from: 210,
  },
  {
    id: 'c06',
    img: 'cakes/cake-06',
    ar: 1280 / 1110,
    name: 'Mèo nằm mái tuyết',
    msg: 'Happy birth day Gia Huy 3 tuổi',
    cat: 'kids',
    note: 'Bánh vòm xanh pastel, kem trắng phủ như tuyết, con mèo nặn tay đặt trên chóp.',
    from: 240,
  },
  {
    id: 'c07',
    img: 'cakes/cake-07',
    ar: 1280 / 1206,
    name: 'Ombre hồng tặng mẹ',
    msg: 'Chúc mừng sinh nhật Mẹ yêu',
    cat: 'birthday',
    note: 'Thân bánh chuyển hồng dần xuống chân, hoa kem cánh mỏng, nơ voan trắng.',
    from: 230,
  },
  {
    id: 'c08',
    img: 'cakes/cake-08',
    ar: 1246 / 1280,
    name: 'Trái tim viền sò',
    msg: 'Chúc mừng sinh nhật Vợ yêu 24 tuổi',
    cat: 'celebration',
    note: 'Cốt tim, viền bắt sò trắng, ruy băng đỏ mận thắt nơ ở chân bánh.',
    from: 265,
  },
  {
    id: 'c09',
    img: 'cakes/cake-09',
    ar: 1136 / 1280,
    name: 'Bông lan trứng muối Kuromi',
    msg: 'Chúc mừng sinh nhật Ngọc Diệp 7 tuổi',
    cat: 'kids',
    note: 'Bông lan phủ ruốc và sốt trứng muối, thắt nơ tím, cắm topping theo nhân vật bé thích.',
    from: 255,
  },
  {
    id: 'c10',
    img: 'cakes/cake-10',
    ar: 1180 / 1280,
    name: 'Bông lan công chúa',
    msg: 'Em Gái Bánh Bao 1 tuổi',
    cat: 'kids',
    note: 'Cùng cốt bông lan trứng muối, đổi sang bộ topping lâu đài và nàng tiên nhỏ.',
    from: 255,
  },
  {
    id: 'c11',
    img: 'cakes/cake-11',
    ar: 1125 / 888,
    name: 'Hoa quả tươi',
    msg: '',
    cat: 'birthday',
    note: 'Xoài, dâu, nho, cúc hoạ mi tươi xếp giữa vành kem bắt răng cưa. Mẫu bán chạy quanh năm.',
    from: 225,
  },
  {
    id: 'c12',
    img: 'cakes/cake-12',
    ar: 1125 / 1367,
    name: 'Bó hoa kem 20/10',
    msg: 'Nhân ngày Phụ nữ Việt Nam xin chúc phái đẹp luôn luôn rạng ngời',
    cat: 'celebration',
    note: 'Bắt kín mặt bánh bằng hoa hồng xoáy, bọc voan như một bó hoa mang đi tặng được.',
    from: 280,
  },
  {
    id: 'c13',
    img: 'cakes/cake-13',
    ar: 1125 / 1371,
    name: 'Hồng bạch một đoá',
    msg: 'Chúc Mẹ yêu 20/10 vui vẻ',
    cat: 'celebration',
    note: 'Cả chiếc bánh là một bông hồng, cánh vuốt từ ngoài vào, nhuỵ hồng phấn ở giữa.',
    from: 290,
  },
  {
    id: 'c14',
    img: 'cakes/cake-14',
    ar: 1125 / 1251,
    name: 'Hồng bạch nhuỵ đậm',
    msg: 'Chúc mẹ ngày lễ 20/10 thật nhiều sức khoẻ',
    cat: 'minimal',
    note: 'Cùng lối bắt cánh, nhuỵ đánh đậm hơn, ruy băng chữ thay cho voan.',
    from: 290,
  },
  {
    id: 'c15',
    img: 'cakes/cake-15',
    ar: 1125 / 1102,
    name: 'Tim đỏ viết kín đế',
    msg: 'Cảm ơn anh đã đến trong cuộc sống của em',
    cat: 'celebration',
    note: 'Nền đỏ nhung, viền bắt sò trắng. Đế bánh viết kín cả một lá thư.',
    from: 270,
  },
  {
    id: 'c16',
    img: 'cakes/cake-16',
    ar: 1125 / 1311,
    name: 'Ngựa bạch trên cỏ',
    msg: 'Mẹ iu con zai của mẹ nhiều',
    cat: 'kids',
    note: 'Bánh chữ nhật, viền bắt sóng xanh biển, tượng ngựa và bánh quy pretzel làm hàng rào.',
    from: 305,
  },
]

export const byId = (id: string) => cakes.find((c) => c.id === id)

/** Mẫu nổi bật cho dải cuộn ngang — chọn theo độ đa dạng, không theo thứ tự file. */
export const signature = ['c11', 'c01', 'c06', 'c13', 'c09', 'c04', 'c15'].map(
  (id) => byId(id) as Cake,
)

export const galleryOrder = [
  'c07', 'c02', 'c12', 'c05', 'c16', 'c10', 'c14', 'c03', 'c08', 'c11', 'c06', 'c01',
].map((id) => byId(id) as Cake)

/** Câu chữ thật đã bắt kem lên đế bánh — dùng cho dải chạy. */
export const realMessages = [
  'happy birth day Mom iu',
  'Chúc mừng sinh nhật Ngọc Diệp 7 tuổi',
  'Vợ yêu 24 tuổi',
  'Chúc Mẹ yêu 20/10 vui vẻ',
  'Mẹ iu con zai của mẹ nhiều',
  'Chúc Phú đậu viên chức',
  'Em Gái Bánh Bao 1 tuổi',
  'Cảm ơn anh đã đến trong cuộc sống của em',
  'Cầm lấy mà đi sinh nhật',
]

export const sizes = [
  { cm: 16, serve: '2 – 4 người', price: 145 },
  { cm: 18, serve: '4 – 6 người', price: 185 },
  { cm: 20, serve: '6 – 10 người', price: 240 },
  { cm: 22, serve: '10 – 14 người', price: 305 },
  { cm: 25, serve: '15 – 20 người', price: 415 },
]

export const shapes = [
  { id: 'round', name: 'Tròn' },
  { id: 'heart', name: 'Trái tim' },
  { id: 'square', name: 'Vuông' },
] as const

export const creams = [
  { id: 'ivory', name: 'Trắng ngà', hex: '#fbf6ec', ring: '#e9dfcd' },
  { id: 'sky', name: 'Xanh pastel', hex: '#a8d6e4', ring: '#7cbdd0' },
  { id: 'rose', name: 'Hồng phấn', hex: '#f2c3cf', ring: '#dd9dae' },
  { id: 'mint', name: 'Xanh cốm', hex: '#c2ddc4', ring: '#9ac09d' },
  { id: 'ocean', name: 'Xanh biển', hex: '#5f9fb8', ring: '#3f7f98' },
  { id: 'cocoa', name: 'Chocolate', hex: '#a97d5c', ring: '#8a6244' },
]

export const toppings = [
  { id: 'flower', name: 'Hoa bắt kem', add: 30 },
  { id: 'drip', name: 'Drip chảy mép', add: 15 },
  { id: 'ribbon', name: 'Nơ ruy băng', add: 10 },
  { id: 'fruit', name: 'Hoa quả tươi', add: 40 },
  { id: 'figure', name: 'Tượng / topping nhân vật', add: 35 },
  { id: 'photo', name: 'In ảnh ăn được', add: 50 },
  { id: 'floss', name: 'Đổi cốt bông lan trứng muối', add: 40 },
]

export const steps = [
  {
    n: '01',
    t: 'Chọn mẫu',
    d: 'Lướt mẫu ở đây hoặc chụp màn hình mẫu bạn thích ở đâu đó gửi sang Zalo. Mẫu lạ cũng nhận.',
  },
  {
    n: '02',
    t: 'Chốt size & vị',
    d: 'Bao nhiêu người ăn thì chọn size đó. Vị cốt: bơ trứng, chocolate, trà xanh hoặc bông lan trứng muối.',
  },
  {
    n: '03',
    t: 'Ghi lời nhắn',
    d: 'Nhắn nguyên văn câu bạn muốn viết lên đế, kể cả dấu chấm than. Viết sai chính tả là viết lại.',
  },
  {
    n: '04',
    t: 'Xác nhận & cọc',
    d: 'Chốt giờ lấy bánh. Bánh vẽ tay hoặc bánh cưới thì cọc trước một nửa.',
  },
  {
    n: '05',
    t: 'Nhận bánh',
    d: 'Ra tiệm lấy hoặc để tiệm giao. Bánh nào cũng có nến, dao nhựa và đĩa giấy đi kèm.',
  },
]

/** TODO: thay bằng review thật chụp từ Facebook/Zalo của tiệm. */
export const reviews = [
  {
    name: 'Chị Hà Trang',
    where: 'Quảng Ninh, Quảng Xương',
    text: 'Đặt lúc 8 giờ tối, 11 giờ trưa hôm sau có bánh. Cái nơ hồng đúng như ảnh gửi, chữ viết đẹp hơn mình tưởng.',
    cake: 'c04',
    tilt: -2.4,
  },
  {
    name: 'Anh Giáp',
    where: 'Ninh Phạm',
    text: 'Con trai đòi bánh bóng đá. Cô chủ hỏi kỹ con thích đội nào rồi làm nguyên cái sân cỏ. Thằng bé không cho ai cắt.',
    cake: 'c02',
    tilt: 1.8,
  },
  {
    name: 'Chị Diệp',
    where: 'thị trấn Quảng Xương',
    text: 'Bông lan trứng muối ở đây ruốc nhiều, không ngọt gắt. Năm nào sinh nhật con cũng đặt chỗ này.',
    cake: 'c09',
    tilt: -1.2,
  },
  {
    name: 'Chị Ngọc',
    where: 'khách quen 4 năm',
    text: 'Mình gửi cả đoạn dài, tưởng viết không vừa. Vậy mà đế bánh viết kín, chữ vẫn đều tăm tắp.',
    cake: 'c15',
    tilt: 2.2,
  },
]

export const nav = [
  { href: '#mau-banh', label: 'Mẫu bánh' },
  { href: '#dip', label: 'Chọn theo dịp' },
  { href: '#dat-banh', label: 'Tự thiết kế' },
  { href: '#chuyen-tiem', label: 'Chuyện của tiệm' },
  { href: '#hinh', label: 'Hình bánh' },
]

export const vnd = (k: number) => `${k.toLocaleString('vi-VN')}.000đ`
