
import { Teacher, ScheduleSlot, PKLAssignment, Report, ReportStatus, CurriculumSection } from './types';

export const SCHOOL_LOGO = "https://upload.wikimedia.org/wikipedia/id/thumb/a/a4/Logo_SMK_Negeri_1_Purbalingga.png/200px-Logo_SMK_Negeri_1_Purbalingga.png";

// Helper to generate class names based on the user's specific structure (14 classes per grade)
const JURUSAN_CONFIG = [
  { code: 'AKL', count: 3, name: 'Akuntansi dan Keuangan Lembaga' },
  { code: 'MPLB', count: 3, name: 'Manajemen Perkantoran' },
  { code: 'PPLG', count: 2, name: 'Pengembangan Perangkat Lunak' },
  { code: 'TJKT', count: 2, name: 'Teknik Jaringan Komputer' },
  { code: 'KLN', count: 1, name: 'Kuliner' },
  { code: 'KDS', count: 1, name: 'Kecantikan dan Spa' },
  { code: 'PM', count: 2, name: 'Pemasaran' }
];

const GRADES = ['X', 'XI', 'XII'];

export const CLASS_NAMES: string[] = [];

GRADES.forEach(grade => {
  JURUSAN_CONFIG.forEach(jurusan => {
    for (let i = 1; i <= jurusan.count; i++) {
      CLASS_NAMES.push(`${grade} ${jurusan.code} ${i}`);
    }
  });
});

// Helper to create teachers cleanly
const createTeacher = (id: number, name: string, nip: string, status: any, subjectsRaw: string, duties: any[] = [], teachingHours = 24): Teacher => {
  const subjects = subjectsRaw.split(',').map(s => s.trim().replace(/^-$/, '')).filter(s => s);
  return {
    id: `t${id}`,
    name,
    nip,
    status,
    subjects,
    maxHours: 24,
    teachingHours,
    additionalDuties: duties
  };
};

export const MOCK_TEACHERS: Teacher[] = [
  // PNS (1-36)
  createTeacher(1, 'Maryono, S.Pd., M.Si.', '196607012000121002', 'PNS', 'Kepala Sekolah', [{type: 'KepalaSekolah', description: 'Kepala Sekolah', equivalentHours: 24}], 0),
  createTeacher(2, 'Dra. Sri Mularsih', '196706201994122001', 'PNS', 'Matematika', [{type: 'WaliKelas', description: 'X MPLB 1', equivalentHours: 2}], 21),
  createTeacher(3, 'Drs. Fiva Widiarto', '196510231996011002', 'PNS', 'Seni Budaya', [], 28),
  createTeacher(4, 'Wahyu Budi Susapti, S.Pd, MM.', '197207291997022002', 'PNS', 'Konsentrasi MP', [{type: 'Kakomli', description: 'Kakomli Kecantikan & Spa', equivalentHours: 12}], 24),
  createTeacher(5, 'Marwoto, S.Pd, S.Kom', '196904082000121001', 'PNS', 'Konsentrasi TKJ', [], 18),
  createTeacher(6, 'Sri Endah Swarastuti, S.Pd', '197407022003122004', 'PNS', 'Project IPAS', [{type: 'Staf', description: 'Staf Sarpras Ur. LH', equivalentHours: 4}, {type: 'PembinaEkskul', description: 'KIR', equivalentHours: 2}], 24),
  createTeacher(7, 'Dra. Cukat Budi Rahayu', '196901121994032010', 'PNS', 'Bahasa Inggris', [{type: 'WaliKelas', description: 'X AKL 1', equivalentHours: 2}], 32),
  createTeacher(8, 'Dra. Diah Ayu Supriyanti', '196603261994122004', 'PNS', 'Pendidikan Pancasila', [], 24),
  createTeacher(9, 'Justina Trirahaju Leksanawati, S.Pd., M.Si.', '197104162003122006', 'PNS', 'Konsentrasi AK, Dasar-Dasar AKL', [{type: 'Lainnya', description: 'Direktur LSP P1', equivalentHours: 6}, {type: 'Kakomli', description: 'Kakomli Kuliner', equivalentHours: 12}], 24),
  createTeacher(10, 'Sri Wahyuni, S.Pd', '197008022002122004', 'PNS', 'Konsentrasi AK, PKWU', [{type: 'WaliKelas', description: 'XI AKL 2', equivalentHours: 2}], 24),
  createTeacher(11, 'Dwi Agus Tri M.M., S.Pd', '197102232002122004', 'PNS', 'Matematika', [{type: 'WaliKelas', description: 'XI KLN', equivalentHours: 2}], 10),
  createTeacher(12, 'Sumardi, S.Pd., S.Kom', '197305272003121002', 'PNS', 'Dasar-Dasar TJKT, Konsentrasi TKJ', [{type: 'Waka', description: 'WKS Sarpras', equivalentHours: 12}], 18),
  createTeacher(13, 'Agung Pamuji, S.Pd', '197402132005011008', 'PNS', 'Konsentrasi AK', [{type: 'Kakomli', description: 'Kakomli MPLB', equivalentHours: 12}], 27),
  createTeacher(14, 'Retnowati, S.Pd', '197303272005012009', 'PNS', 'Konsentrasi AK, PKWU', [{type: 'Kakomli', description: 'Kakomli AKL & Peminatan', equivalentHours: 12}], 12),
  createTeacher(15, 'Tony Eka Martin Wibowo, S.Si.', '197912092005011004', 'PNS', 'Project IPAS', [{type: 'Staf', description: 'Staf Sarpras Ur. Sarpras', equivalentHours: 4}, {type: 'WaliKelas', description: 'X PM 1', equivalentHours: 2}], 30),
  createTeacher(16, 'Nur Romlah, S.Pd', '197509082008012008', 'PNS', 'Konsentrasi MP', [{type: 'Staf', description: 'Plt Ka Tata Usaha', equivalentHours: 12}], 9),
  createTeacher(17, 'Deddy Suwito, S.Kom', '197209022006041013', 'PNS', 'Konsentrasi RPL', [{type: 'Koordinator', description: 'Koordinator Tefa', equivalentHours: 12}], 30),
  
  createTeacher(18, 'Agus Wuryanto, S.Pd', '197503222006041002', 'PNS', 'Bimbingan Konseling', [
    {type: 'Staf', description: 'Staf Sarpras Ur. Sarana', equivalentHours: 4},
    {type: 'Lainnya', description: 'Membimbing 321 Siswa', equivalentHours: 0}
  ], 24),

  createTeacher(19, 'Tri Puji Utami, S.Kom', '198304252009032009', 'PNS', 'Informatika, Dasar-Dasar TJKT, PKWU', [], 26),
  createTeacher(20, 'Puji Pertiwi Sayekti, S.Pd', '196805102005012011', 'PNS', 'Dasar-dasar Manajemen, Konsentrasi MP', [{type: 'WaliKelas', description: 'X MPLB 2', equivalentHours: 2}], 24),
  createTeacher(21, 'Nur Fajriyahti, S.Pd.', '197005212007012014', 'PNS', 'Dasar-dasar Manajemen, Konsentrasi MP', [{type: 'Lainnya', description: 'Peminatan MPLB', equivalentHours: 2}], 18),
  createTeacher(22, 'Srirahayu, S.Pd.', '197408042008012009', 'PNS', 'Konsentrasi AK, Dasar-Dasar AKL', [{type: 'WaliKelas', description: 'XI AKL 1', equivalentHours: 2}], 24),
  createTeacher(23, 'Romidin, S.Pd', '197505052008011021', 'PNS', 'Konsentrasi MP, Mapel Pilihan', [{type: 'Waka', description: 'WKS Humas', equivalentHours: 12}], 13),
  createTeacher(24, 'Teguh Cahyono, S.Pd.', '198110232006041010', 'PNS', 'Penjasorkes', [{type: 'WaliKelas', description: 'X TJKT 2', equivalentHours: 2}], 24),
  createTeacher(25, 'Seto Eko Purwanto, S.Si', '197804232010011009', 'PNS', 'Matematika', [{type: 'Staf', description: 'Staf Khusus SDM', equivalentHours: 4}], 24),
  
  createTeacher(26, 'Nelly Amaliyah, S.Psi', '197907032010012019', 'PNS', 'Bimbingan Konseling', [
    {type: 'Koordinator', description: 'Koord BK', equivalentHours: 12}, 
    {type: 'Staf', description: 'Staf Humas Ur. Kesra', equivalentHours: 4}, 
    {type: 'Lainnya', description: 'BKK', equivalentHours: 2},
    {type: 'Lainnya', description: 'Membimbing 320 Siswa', equivalentHours: 0}
  ], 24),

  createTeacher(27, 'Satyo Nugroho, S.Kom.', '197807142009031006', 'PNS', 'Dasar-Dasar TJKT, PKWU', [{type: 'Waka', description: 'WKS Kurikulum', equivalentHours: 12}], 28),
  createTeacher(28, 'Suratno, S.Pd', '198409032010011012', 'PNS', 'Bahasa Jawa', [{type: 'Waka', description: 'WKS Kesiswaan', equivalentHours: 12}], 27),
  createTeacher(29, 'Vektor Realita Aditopo, S.Pd', '198603312011011003', 'PNS', 'Bahasa Indonesia', [{type: 'WaliKelas', description: 'XII KLN', equivalentHours: 2}], 25),
  createTeacher(30, 'Adi Setiawan, S.Pd.', '199012292014021001', 'PNS', 'Dasar-Dasar PPLG, Konsentrasi RPL', [{type: 'TimPengembang', description: 'TPS', equivalentHours: 4}], 33),
  createTeacher(31, 'Galih Tyas Anjari, S.Pd.', '199201212014022001', 'PNS', 'Mapel Pilihan, Konsentrasi RPL', [{type: 'Kakomli', description: 'Kakomli PPLG', equivalentHours: 12}], 24),
  createTeacher(32, 'Deti Lestiyorini, S.Pd.', '198912142014022001', 'PNS', 'Informatika, Konsentrasi TKJ', [{type: 'WMM', description: 'WMM', equivalentHours: 6}, {type: 'Lainnya', description: 'Ketua Kopsis', equivalentHours: 2}], 20),
  createTeacher(33, 'Mahzun, S.Pd I', '197601072008011009', 'PNS', 'Pendidikan Agama Islam', [{type: 'PembinaEkskul', description: 'Rohis', equivalentHours: 2}], 24),
  createTeacher(34, 'Sugeng Pitoyo, S.Pd.', '197311032008011002', 'PNS', 'Bahasa Jawa', [], 28),
  createTeacher(35, 'Asriyatun, S.Pd', '199208262020122009', 'PNS', 'Konsentrasi AK, Informatika', [{type: 'Staf', description: 'Staf SDM', equivalentHours: 4}, {type: 'WaliKelas', description: 'XII AKL 2', equivalentHours: 2}], 12),
  createTeacher(36, 'Nur Laeli, S.Pd', '199704112020122011', 'PNS', 'Konsentrasi AK, Dasar-Dasar AKL, Informatika', [{type: 'Bendahara', description: 'Bendahara BOS', equivalentHours: 6}], 9),

  // PPPK (37-74)
  createTeacher(37, 'Sepudin Zupri, S.Kom', '197010222022211001', 'PPPK', 'Konsentrasi TKJ', [{type: 'Kakomli', description: 'Kakomli TJKT', equivalentHours: 12}], 20),
  createTeacher(38, 'Arif Nurokhman, S.Pd', '198010172022211002', 'PPPK', 'Penjasorkes', [{type: 'Staf', description: 'Staf Sarpras', equivalentHours: 4}, {type: 'WaliKelas', description: 'XI TKJ 2', equivalentHours: 2}, {type: 'PembinaEkskul', description: 'Semapala/Voli', equivalentHours: 2}], 24),
  createTeacher(39, 'Elis Sugiarti, S.Pd.', '198503072022212028', 'PPPK', 'Bahasa Jepang', [{type: 'WaliKelas', description: 'XI TKJ 1', equivalentHours: 2}, {type: 'PembinaEkskul', description: 'Pramuka', equivalentHours: 2}], 28),
  createTeacher(40, 'Sudiyarti, S.Pd', '198511182022212012', 'PPPK', 'Matematika', [{type: 'Staf', description: 'Staf Kurikulum', equivalentHours: 4}, {type: 'WaliKelas', description: 'XII TKJ 2', equivalentHours: 2}], 23),
  createTeacher(41, 'Otiah, S.Pd.', '198802242022212013', 'PPPK', 'Bahasa Indonesia', [{type: 'Staf', description: 'Staf Sarpras', equivalentHours: 4}, {type: 'Koordinator', description: 'Ka. Perpus', equivalentHours: 6}, {type: 'WaliKelas', description: 'XII TKKR', equivalentHours: 2}], 26),
  
  createTeacher(42, 'Nova Ristya W.P., S.Pd', '198811042022211004', 'PPPK', 'Bimbingan & Konseling', [
    {type: 'PembinaEkskul', description: 'Pembina OSIS', equivalentHours: 2}, 
    {type: 'Lainnya', description: 'BKK', equivalentHours: 2},
    {type: 'Lainnya', description: 'Membimbing 316 Siswa', equivalentHours: 0}
  ], 24),

  createTeacher(43, 'Menik Yuni Hartini, S.Pd.', '198906292022212008', 'PPPK', 'Konsentrasi PM, Digital Marketing', [{type: 'Kakomli', description: 'Kakomli PM', equivalentHours: 12}], 26),
  createTeacher(44, 'Baiq Nur Aisyah, S.Pd.', '198909222022212005', 'PPPK', 'Bahasa Jawa, Seni Budaya', [{type: 'WaliKelas', description: 'X PM 2', equivalentHours: 2}, {type: 'PembinaEkskul', description: 'Karawitan', equivalentHours: 2}], 28),
  createTeacher(45, 'Sulistiono, S.Pd.', '199112202022211007', 'PPPK', 'Pendidikan Pancasila, Sejarah', [{type: 'Staf', description: 'Staf Kesiswaan Ur. TPPK', equivalentHours: 4}, {type: 'Lainnya', description: 'Pengurus Kopsis', equivalentHours: 2}], 32),
  createTeacher(46, 'Isria Rizqona Firdausyi, S.Pd.', '199201312022212011', 'PPPK', 'Sejarah Indonesia', [{type: 'Staf', description: 'Staf SDM', equivalentHours: 4}, {type: 'WaliKelas', description: 'X MPLB 1', equivalentHours: 2}], 32),
  createTeacher(47, 'Hindun Fatmawati, S.Pd.', '199210042022212007', 'PPPK', 'Konsentrasi AK, Mapel Pilihan', [{type: 'WaliKelas', description: 'X AKL 1', equivalentHours: 2}], 29),
  createTeacher(48, 'Ana Nurlatifah, S.Pd.', '199304032022212014', 'PPPK', 'Matematika', [{type: 'Staf', description: 'Staf Kurikulum Ur. KBM', equivalentHours: 4}], 15),
  createTeacher(49, 'Dwi Inayah Rahmawati, M.Pd.', '199311282022212011', 'PPPK', 'Matematika', [{type: 'Bendahara', description: 'Bendahara BOP', equivalentHours: 6}, {type: 'WaliKelas', description: 'XI MPLB 2', equivalentHours: 2}], 24),
  createTeacher(50, 'Danu Dwi Jatmiko, S.Pd.', '199401192022211003', 'PPPK', 'IPAS', [{type: 'PembinaEkskul', description: 'MPK', equivalentHours: 2}], 30),
  createTeacher(51, 'Restu Afri Widhi Hastutiningsih, S.Pd.', '199604032022212009', 'PPPK', 'Konsentrasi RPL, PKWU, Informatika', [{type: 'Staf', description: 'Staf Humas Ur. PKL', equivalentHours: 4}, {type: 'WaliKelas', description: 'X PPLG 1', equivalentHours: 2}], 28),
  createTeacher(52, 'Nining Setiani, S.Pd.', '199610102022212008', 'PPPK', 'Dasar-dasar PPLG, Informatika, PKWU', [{type: 'Staf', description: 'Staf Humas Ur. PKL', equivalentHours: 4}, {type: 'WaliKelas', description: 'XII PPLG 2', equivalentHours: 2}], 28),
  createTeacher(53, 'Kukuh Pribadi, S.Pd.', '198610232022211006', 'PPPK', 'Mapel Pilihan (Seni Musik)', [{type: 'PembinaEkskul', description: 'Musik', equivalentHours: 2}], 28),
  createTeacher(54, 'Yekti Apriyoni, S.Pd.', '197804272023212002', 'PPPK', 'Sejarah, Pendidikan Pancasila', [{type: 'Staf', description: 'Staf SDM', equivalentHours: 4}, {type: 'WaliKelas', description: 'XI PM', equivalentHours: 2}], 32),
  createTeacher(55, 'Novita Adhimurti, S.Pd.', '197811142023212001', 'PPPK', 'PKWU, Informatika', [{type: 'WaliKelas', description: 'X AKL 3', equivalentHours: 2}], 29),
  createTeacher(56, 'Khamsyatun Yudiana, S.Pd.I.', '198207132023212011', 'PPPK', 'PAI', [{type: 'WaliKelas', description: 'X PPLG 2', equivalentHours: 2}], 33),
  createTeacher(57, 'Nanang Cahyana, S.Pd.Ing.', '198603172023211003', 'PPPK', 'Bahasa Inggris', [{type: 'PembinaEkskul', description: 'English Club', equivalentHours: 2}], 32),
  createTeacher(58, 'Waskito Ismu Hastomo, S.Pd.', '198606092023211007', 'PPPK', 'Informatika, PKWU', [{type: 'Staf', description: 'Staf Tefa/Bendahara', equivalentHours: 4}, {type: 'WaliKelas', description: 'X AKL 2', equivalentHours: 2}, {type: 'PembinaEkskul', description: 'PMR', equivalentHours: 2}], 28),
  createTeacher(59, 'Lely Erawati, S.Pd.', '198708212023212018', 'PPPK', 'Pendidikan Pancasila, Sejarah', [{type: 'WaliKelas', description: 'XI MPLB 1', equivalentHours: 2}, {type: 'PembinaEkskul', description: 'Pramuka', equivalentHours: 2}], 24),
  createTeacher(60, 'Septian Endro Laksono, S.Pd.', '199009052023211004', 'PPPK', 'Informatika, PKWU', [{type: 'Staf', description: 'Staf Kurikulum/Sarpras', equivalentHours: 4}, {type: 'PembinaEkskul', description: 'Paskas', equivalentHours: 2}], 29),
  createTeacher(61, 'Firmanika Rozaqi, S.Pd.', '199104242023212024', 'PPPK', 'Bahasa Indonesia', [{type: 'WaliKelas', description: 'XI PPLG 1', equivalentHours: 2}, {type: 'PembinaEkskul', description: 'Broadcasting', equivalentHours: 2}], 27),
  createTeacher(62, 'Devi Artati, S.Pd.', '199210112023212020', 'PPPK', 'Bahasa Indonesia', [{type: 'WaliKelas', description: 'X AKL 3', equivalentHours: 2}, {type: 'PembinaEkskul', description: 'PMR', equivalentHours: 2}], 30),
  createTeacher(63, 'Soviatun Khasanah, S.Pd.', '199606302023212006', 'PPPK', 'Konsentrasi PM, PKWU, Dasar-Dasar Pemasaran', [{type: 'WMM', description: 'Staf WMM', equivalentHours: 4}, {type: 'WaliKelas', description: 'XII PM', equivalentHours: 2}], 30),
  createTeacher(64, 'Miftah Iskandar, S.Pd.', '198512112023211006', 'PPPK', 'Bahasa Inggris', [{type: 'Staf', description: 'Staf TPS', equivalentHours: 4}, {type: 'WaliKelas', description: 'XII PPLG 1', equivalentHours: 2}, {type: 'PembinaEkskul', description: 'English Club', equivalentHours: 2}], 36),
  createTeacher(65, 'Dista Puspitasari Adi, S.Pd.', '198603182024212004', 'PPPK', 'Konsentrasi MP', [{type: 'WaliKelas', description: 'XI MPLB 3', equivalentHours: 2}], 38),
  createTeacher(66, 'Rita Wijiarti, S.Pd.', '199410172024212021', 'PPPK', 'Dasar-Dasar KDS, Konsentrasi TKKR', [{type: 'WaliKelas', description: 'X KDS', equivalentHours: 2}, {type: 'Lainnya', description: 'Peminatan KDS', equivalentHours: 2}], 28),
  
  createTeacher(67, 'Safa Aulia Astri, S.Sos', '199607212024212021', 'PPPK', 'Bimbingan Konseling', [
    {type: 'Lainnya', description: 'Membimbing 279 Siswa', equivalentHours: 0}
  ], 24),

  createTeacher(68, 'Agus Sutono, S.Pd.', '197406182025211007', 'PPPK', 'PKWU (PKDK)', [{type: 'Staf', description: 'Staf Humas/Sarpras', equivalentHours: 4}, {type: 'PembinaEkskul', description: 'KIK', equivalentHours: 2}], 30),
  createTeacher(69, 'Yanti Karadina, S.Pd.', '197512172025212006', 'PPPK', 'Dasar-Dasar Manajemen, Konsentrasi MP', [{type: 'WaliKelas', description: 'XI MPLB 2', equivalentHours: 2}], 28),
  createTeacher(70, 'Widia Sukaesih, S.E.', '197810082025212008', 'PPPK', 'Dasar-Dasar Pemasaran, Konsentrasi PM, PKWU', [{type: 'WaliKelas', description: 'XII TJKT 1', equivalentHours: 2}], 30),
  createTeacher(71, 'Triyanto, S.Pd.', '198411252025211021', 'PPPK', 'Penjasorkes', [{type: 'WaliKelas', description: 'X KLN', equivalentHours: 2}, {type: 'PembinaEkskul', description: 'Bola Volly', equivalentHours: 2}], 24),
  createTeacher(72, 'Inayatul Munawaroh, S.Pd.', '199301062025212023', 'PPPK', 'Konsentrasi TKKR', [{type: 'WaliKelas', description: 'XII TKKR', equivalentHours: 2}], 6),
  createTeacher(73, 'Danu Setio Aji, S.Pd.', '199310162025211021', 'PPPK', 'Penjasorkes', [{type: 'WaliKelas', description: 'XI PM', equivalentHours: 2}], 22),
  createTeacher(74, 'Hera Dwi Suryandari, S.Pd.', '199312262025212012', 'PPPK', 'Pengelolaan Rapat, Adm. Umum, Kewirausahaan', [{type: 'WaliKelas', description: 'X MPLB 3', equivalentHours: 2}], 30),

  // GTT PROV (75-77)
  createTeacher(75, 'Slamet Suparman, S.Pd.', '-', 'GTT', 'Informatika, Konsentrasi PM, Bisnis Ritel', [], 30),
  createTeacher(76, 'Devi Dwi Wahyuni, S.Pd.', '-', 'GTT', 'PAI', [{type: 'Lainnya', description: 'Pengurus Kopsis', equivalentHours: 2}, {type: 'WaliKelas', description: 'XI PPLG 2', equivalentHours: 2}], 30),
  createTeacher(77, 'Muhammad Idris Afandi, S.S., M.Pd.', '-', 'GTT', 'Bahasa Indonesia', [{type: 'Staf', description: 'Staf Humas', equivalentHours: 4}, {type: 'Lainnya', description: 'BKK', equivalentHours: 2}, {type: 'PembinaEkskul', description: 'Pramuka', equivalentHours: 2}], 7),

  // Guru Kontrak (78-83)
  createTeacher(78, 'Rindhi Rezqi Hertindha, M.Pd.', '-', 'Guru Kontrak', 'Bimbingan Konseling', [
    {type: 'Lainnya', description: 'Membimbing 249 Siswa', equivalentHours: 0}
  ], 24),
  createTeacher(79, 'Seli Fadriyah, S.Pd.', '-', 'Guru Kontrak', 'PAI', [{type: 'PembinaEkskul', description: 'Rohis', equivalentHours: 2}], 30),
  createTeacher(80, 'Pia Celestine, S.Pd.', '-', 'Guru Kontrak', 'Peminatan Kuliner', [], 30),
  createTeacher(81, 'Nurhidayah, S.S., M.Pd.', '-', 'Guru Kontrak', 'Bahasa Inggris', [], 36),
  createTeacher(82, 'Prana Prakasita, S.Pd.', '-', 'Guru Kontrak', 'Dasar-Dasar Kuliner, Konsentrasi Kuliner', [], 26),
  createTeacher(83, 'Rita Puspitasari, S.Pd.', '-', 'Guru Kontrak', 'Bahasa Inggris', [], 32)
];

export const MOCK_SCHEDULE: ScheduleSlot[] = [
  { id: 's1', day: 'Senin', period: 2, className: 'X PPLG 1', subject: 'Matematika', teacherId: 't2' },
  { id: 's2', day: 'Senin', period: 3, className: 'X PPLG 1', subject: 'Matematika', teacherId: 't2' },
  { id: 's3', day: 'Senin', period: 4, className: 'XI TJKT 2', subject: 'Bahasa Inggris', teacherId: 't7' },
  { id: 's4', day: 'Selasa', period: 1, className: 'X AKL 1', subject: 'Akuntansi Dasar', teacherId: 't9' },
  { id: 's5', day: 'Rabu', period: 3, className: 'XII PPLG 2', subject: 'Produktif PPLG', teacherId: 't30' },
];

export const MOCK_PKL: PKLAssignment[] = [
  { id: 'p1', studentName: 'Ahmad Zulkarnain', companyName: 'PT Telkom Indonesia', teacherId: 't30', startDate: '2024-01-10', endDate: '2024-04-10', status: 'Active' },
  { id: 'p2', studentName: 'Dewi Lestari', companyName: 'CV Kreatif Digital', teacherId: 't30', startDate: '2024-01-10', endDate: '2024-04-10', status: 'Active' },
  { id: 'p3', studentName: 'Reza Rahadian', companyName: 'Dinas Kominfo', teacherId: 't19', startDate: '2024-02-01', endDate: '2024-05-01', status: 'Pending' },
];

export const MOCK_REPORTS: Report[] = [
  { id: 'r1', teacherId: 't2', title: 'Laporan Nilai UTS', dueDate: '2024-03-20', status: ReportStatus.SUBMITTED, submissionLink: '#' },
  { id: 'r2', teacherId: 't3', title: 'Laporan Nilai UTS', dueDate: '2024-03-20', status: ReportStatus.PENDING },
];

export const DAYS_OF_WEEK = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

export const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const SCHEDULE_TIMINGS: Record<string, Record<number, string>> = {
  'Senin': {
    1: '07:00 - 07:45',
    2: '07:45 - 08:30',
    3: '08:30 - 09:15',
    4: '09:30 - 10:15',
    5: '10:15 - 11:00',
    6: '11:00 - 11:45',
    7: '12:30 - 13:10',
    8: '13:10 - 13:45',
    9: '13:45 - 14:20',
    10: '14:20 - 14:55',
    11: '14:55 - 15:30',
  },
  'Selasa': {
    1: '07:15 - 08:00',
    2: '08:00 - 08:45',
    3: '08:45 - 09:30',
    4: '09:45 - 10:25',
    5: '10:25 - 11:05',
    6: '11:05 - 11:45',
    7: '12:30 - 13:10',
    8: '13:10 - 13:45',
    9: '13:45 - 14:20',
    10: '14:20 - 14:55',
    11: '14:55 - 15:30',
  },
  'Rabu': {
    1: '07:15 - 08:00',
    2: '08:00 - 08:45',
    3: '08:45 - 09:30',
    4: '09:45 - 10:30',
    5: '10:30 - 11:15',
    6: '11:15 - 12:00',
    7: '12:45 - 13:30',
    8: '13:30 - 14:10',
    9: '14:10 - 14:50',
    10: '14:50 - 15:30',
  },
  'Kamis': {
    1: '07:15 - 08:00',
    2: '08:00 - 08:45',
    3: '08:45 - 09:30',
    4: '09:45 - 10:30',
    5: '10:30 - 11:15',
    6: '11:15 - 12:00',
    7: '12:45 - 13:30',
    8: '13:30 - 14:10',
    9: '14:10 - 14:50',
    10: '14:50 - 15:30',
  },
  'Jumat': {
    1: '07:00 - 07:30',
    2: '07:30 - 08:10',
    3: '08:10 - 08:50',
    4: '08:50 - 09:30',
    5: '09:45 - 10:20',
    6: '10:20 - 10:55',
    7: '10:55 - 11:30',
    8: '12:40 - 13:20',
    9: '13:20 - 14:00',
  }
};

export const CURRICULUM_DATA_X: CurriculumSection[] = [
  {
    title: 'Mata Pelajaran Umum',
    items: [
      { name: 'Pendidikan Agama dan Budi Pekerti', intra: 108, p5: '-', total: 108 },
      { name: 'Pendidikan Pancasila', intra: 72, p5: '-', total: 72 },
      { name: 'Bahasa Indonesia', intra: 108, p5: 36, total: 144 },
      { name: 'Pendidikan Jasmani, Olahraga, dan Kesehatan', intra: 108, p5: '-', total: 108 },
      { name: 'Sejarah', intra: 72, p5: '-', total: 72 },
      { name: 'Seni dan Budaya (Pilihan)', intra: 72, p5: '-', total: 72 },
    ],
    subTotal: { name: 'Jumlah JP Mata Pelajaran Umum', intra: 540, p5: 36, total: 576, isTotal: true }
  },
  {
    title: 'Mata Pelajaran Kejuruan',
    items: [
      { name: 'Matematika', intra: 108, p5: 36, total: 144 },
      { name: 'Bahasa Inggris', intra: 108, p5: 36, total: 144 },
      { name: 'Informatika', intra: 108, p5: 36, total: 144 },
      { name: 'Projek Ilmu Pengetahuan Alam dan Sosial', intra: 180, p5: 36, total: 216 },
      { name: 'Dasar-Dasar Program Keahlian', intra: 432, p5: '-', total: 432 },
    ],
    subTotal: { name: 'Jumlah JP Mata Pelajaran Kejuruan', intra: 936, p5: 144, total: '1.080', isTotal: true }
  },
  {
    title: 'Total (Umum + Kejuruan)',
    items: [
      { name: 'Total JP (Umum + Kejuruan)', intra: '1.476', p5: 180, total: '1.656', isHeader: true }
    ]
  },
  {
    title: 'Mata Pelajaran Pilihan & Mulok',
    items: [
      { name: 'Koding dan Kecerdasan Artifisial (Pilihan)', intra: 72, p5: '-', total: 72 },
      { name: 'Muatan Lokal', intra: 72, p5: '-', total: 72 },
    ],
    subTotal: { name: 'Total JP Keseluruhan (Maksimal)', intra: '1.620', p5: 180, total: '1.800', isTotal: true }
  }
];

export const CURRICULUM_DATA_XI: CurriculumSection[] = [
  {
    title: 'Mata Pelajaran Umum',
    items: [
      { name: 'Pendidikan Agama dan Budi Pekerti', intra: 90, p5: 18, total: 108 },
      { name: 'Pendidikan Pancasila', intra: 54, p5: 18, total: 72 },
      { name: 'Bahasa Indonesia', intra: 90, p5: 18, total: 108 },
      { name: 'Pendidikan Jasmani, Olahraga, dan Kesehatan', intra: 54, p5: 18, total: 72 },
      { name: 'Sejarah', intra: 54, p5: 18, total: 72 },
    ],
    subTotal: { name: 'Jumlah JP Mata Pelajaran Umum', intra: 342, p5: 90, total: 432, isTotal: true }
  },
  {
    title: 'Mata Pelajaran Kejuruan',
    items: [
      { name: 'Matematika', intra: 90, p5: 18, total: 108 },
      { name: 'Bahasa Inggris', intra: 108, p5: 36, total: 144 },
      { name: 'Konsentrasi Keahlian', intra: 648, p5: '-', total: 648 },
      { name: 'Kreativitas, Inovasi, dan Kewirausahaan', intra: 180, p5: '-', total: 180 },
      { name: 'Mata Pelajaran Pilihan', intra: 144, p5: '-', total: 144 },
    ],
    subTotal: { name: 'Jumlah JP Mata Pelajaran Kejuruan', intra: '1.170', p5: 54, total: '1.224', isTotal: true }
  },
  {
    title: 'Total (Umum + Kejuruan)',
    items: [
      { name: 'Total JP (Umum + Kejuruan)', intra: '1.512', p5: 144, total: '1.656', isHeader: true }
    ]
  },
  {
    title: 'Muatan Lokal',
    items: [
      { name: 'Muatan Lokal', intra: 72, p5: '-', total: 72 },
    ],
    subTotal: { name: 'Total JP Keseluruhan (Maksimal)', intra: '1.584', p5: 144, total: '1.728', isTotal: true }
  }
];

export const CURRICULUM_DATA_XII: CurriculumSection[] = [
  {
    title: 'Mata Pelajaran Umum',
    items: [
      { name: 'Pendidikan Agama dan Budi Pekerti', intra: 32, p5: 16, total: 48 },
      { name: 'Pendidikan Pancasila', intra: 32, p5: '-', total: 32 },
      { name: 'Bahasa Indonesia', intra: 32, p5: 16, total: 48 },
    ],
    subTotal: { name: 'Jumlah JP Mata Pelajaran Umum', intra: 96, p5: 32, total: 128, isTotal: true }
  },
  {
    title: 'Mata Pelajaran Kejuruan',
    items: [
      { name: 'Matematika', intra: 48, p5: '-', total: 48 },
      { name: 'Bahasa Inggris', intra: 64, p5: '-', total: 64 },
      { name: 'Konsentrasi Keahlian', intra: 352, p5: '-', total: 352 },
      { name: 'Kreativitas, Inovasi, dan Kewirausahaan', intra: 80, p5: '-', total: 80 },
      { name: 'Praktik Kerja Lapangan (PKL)', intra: 736, p5: '-', total: 736 },
      { name: 'Mata Pelajaran Pilihan', intra: 64, p5: '-', total: 64 },
    ],
    subTotal: { name: 'Jumlah JP Mata Pelajaran Kejuruan', intra: '1.344', p5: '-', total: '1.344', isTotal: true }
  },
  {
    title: 'Total (Umum + Kejuruan)',
    items: [
      { name: 'Total JP (Umum + Kejuruan)', intra: '1.440', p5: 32, total: '1.472', isHeader: true }
    ]
  },
  {
    title: 'Muatan Lokal',
    items: [
      { name: 'Muatan Lokal', intra: 32, p5: '-', total: 32 },
    ],
    subTotal: { name: 'Total JP Keseluruhan (Maksimal)', intra: '1.472', p5: 32, total: '1.504', isTotal: true }
  }
];
