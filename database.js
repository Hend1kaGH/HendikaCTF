// 1. Pastikan nama variabelnya adalah userDatabase agar sinkron dengan fungsi validateUser
var userDatabase = [
    { user: "admin", pass: "hctf2025", role: "Superuser", score: 0, solved: [] },
    { user: "4699", pass: "user01", role: "Student", score: 0, solved: [], absen: 1 },
    { user: "4700", pass: "user02", role: "Student", score: 0, solved: [], absen: 2 },
    { user: "4701", pass: "user03", role: "Student", score: 0, solved: [], absen: 3 },
    { user: "4702", pass: "user04", role: "Student", score: 0, solved: [], absen: 4 },
    { user: "4703", pass: "user05", role: "Student", score: 0, solved: [], absen: 5 },
    { user: "4704", pass: "user06", role: "Student", score: 0, solved: [], absen: 6 },
    { user: "4705", pass: "user07", role: "Student", score: 0, solved: [], absen: 7 },
    { user: "4706", pass: "user08", role: "Student", score: 0, solved: [], absen: 8 },
    { user: "4707", pass: "user09", role: "Student", score: 0, solved: [], absen: 9 },
    { user: "4708", pass: "user10", role: "Student", score: 0, solved: [], absen: 10 },
    { user: "4709", pass: "user11", role: "Student", score: 0, solved: [], absen: 11 },
    { user: "4710", pass: "user12", role: "Student", score: 0, solved: [], absen: 12 },
    { user: "4711", pass: "user13", role: "Student", score: 0, solved: [], absen: 13 },
    { user: "4712", pass: "user14", role: "Student", score: 0, solved: [], absen: 14 },
    { user: "4713", pass: "user15", role: "Student", score: 0, solved: [], absen: 15 },
    { user: "4714", pass: "user16", role: "Student", score: 0, solved: [], absen: 16 }, // Nomor Kamu
    { user: "4715", pass: "user17", role: "Student", score: 0, solved: [], absen: 17 },
    { user: "4716", pass: "user18", role: "Student", score: 0, solved: [], absen: 18 },
    { user: "4717", pass: "user19", role: "Student", score: 0, solved: [], absen: 19 },
    { user: "4718", pass: "user20", role: "Student", score: 0, solved: [], absen: 20 },
    { user: "4719", pass: "user21", role: "Student", score: 0, solved: [], absen: 21 },
    { user: "4720", pass: "user22", role: "Student", score: 0, solved: [], absen: 22 },
    { user: "4721", pass: "user23", role: "Student", score: 0, solved: [], absen: 23 },
    { user: "4722", pass: "user24", role: "Student", score: 0, solved: [], absen: 24 },
    { user: "4723", pass: "user25", role: "Student", score: 0, solved: [], absen: 25 },
    { user: "4724", pass: "user26", role: "Student", score: 0, solved: [], absen: 26 },
    { user: "4725", pass: "user27", role: "Student", score: 0, solved: [], absen: 27 },
    { user: "4726", pass: "user28", role: "Student", score: 0, solved: [], absen: 28 },
    { user: "4727", pass: "user29", role: "Student", score: 0, solved: [], absen: 29 },
    { user: "4728", pass: "user30", role: "Student", score: 0, solved: [], absen: 30 },
    { user: "4729", pass: "user31", role: "Student", score: 0, solved: [], absen: 31 },
    { user: "4730", pass: "user32", role: "Student", score: 0, solved: [], absen: 32 },
    { user: "4731", pass: "user33", role: "Student", score: 0, solved: [], absen: 33 },
    { user: "4732", pass: "user34", role: "Student", score: 0, solved: [], absen: 34 },
    { user: "4733", pass: "user35", role: "Student", score: 0, solved: [], absen: 35 },
    { user: "4734", pass: "user36", role: "Student", score: 0, solved: [], absen: 36 }
];

// 2. Fungsi validateUser yang diperbaiki
function validateUser(u, p) {
    const inputUser = String(u).trim();
    // Mencari user di dalam array userDatabase
    return userDatabase.find(account => account.user === inputUser && account.pass === p);
}
