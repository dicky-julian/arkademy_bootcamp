// 1. Function dengan 2 parameter(nama, angka) dengan return biodata
const Biodata = (nama, umur) => {
    if (typeof nama === "string" && typeof umur === "number") {
        return {
            "name" : nama,
            "age" : umur,
            "address" : "Sukun - Malang",
            "hobbies" : [
                "swimming",
                "basketball",
                "illustration",
                "graphic design"
            ],
            "is_married" : false,
            "list_school" : [
                {
                    "name" : "SDK Marga Bhakti Malang",
                    "year_in" : "2008",
                    "year_out" : "2014",
                    "major" : null
                },
                {
                    "name" : "SMPK Kalam Kudus Malang",
                    "year_in" : "2014",
                    "year_out" : "2017",
                    "major" : null
                },
                {
                    "name" : "SMK Telkom Malang",
                    "year_in" : "2017",
                    "year_out" : "2020",
                    "major" : "Software Engineer"
                }
            ],
            "skills" : [
                {
                    "skill_name" : "Laravel",
                    "level" : "advanced"
                },
                {
                    "skill_name" : "Javascript",
                    "level" : "advanced"
                },
                {
                    "skill_name" : "React JS",
                    "level" : "beginner"
                },
                {
                    "skill_name" : "Firebase",
                    "level" : "beginner"
                },
                {
                    "skill_name" : "Responsive Web Design",
                    "level" : "advanced"
                },
            ],
            "interest_in_coding" : true
        }
    } else {
        console.log("Parameter tidak valid");
    }
}

const getBiodata = () => {
    console.log("1. method/function yang menerima dua parameter yakni String (untuk nama) dan angka (untuk umur)");
    console.log(Biodata("Dicky Julian Pratama", 18));
}

// 2. Function validasi Username dan Password dengan REGEX
const usernameValidation = (username) => {
    console.log('');
    console.log("2.Function validasi Username dan Password dengan REGEX");
    if (username.match(/[A-Z]/g) != null) {
        console.log("Username tidak boleh mengandung huruf kapital");
        return false;
    }

    if (username.match(/[\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s]/g) != null) {
        console.log("Username tidak boleh mengandung special case dan spacing");
        return false;
    }

    if (username.match(/[0-9]/g) != null) {
        console.log("Username tidak boleh mengandung numerik");
        return false;
    }

    if (username.match(/[a-z|\_|\.]/g) != null) {
        if (username.match(/[a-z|\_|\.]/g).length < 8 || username.match(/[a-z|\_|\.]/g).length > 12) {
            console.log("Username harus mengandung minimal 8 karakter dan maksimal 12 karakter");
            return false;
        }
    } else {
        return false;
    }

    console.log(`Username ${username} tervalidasi`);
    return true;
}

const passwordValidation = (password) => {
    if (password.match(/[A-Z|\a-z|\0-9]/g).length != 9) {
        console.log("Password harus mengandung minimal 9 karakter");
        return false;
    }

    if (password.match(/[A-Z|\a-z]/g) == null || password.match(/[0-9]/g) == null) {
        console.log("Password harus mengandung masing - masing minimal 1 angka dan 1 hurud");
        return false;
    }

    console.log(`Password ${password} tervalidasi`);
    return true;
}

// 3. Function menghitung huruf vocal
const countVowels = str => {
    console.log("");
    console.log("3. Function menghitung huruf vocal");

    const vowels = 'aiueoAIUEO';
    var index = 0;

    for (var i = 0; i < str.length; i++) {
        if (vowels.indexOf(str[i]) !== -1) {
            index++;
        }
    }

    console.log(`${str} mengandung ${index} huruf vokal`);
}

// 4. Function count word/phrase
const countPhrase = (str, phrase) => {
    console.log("");
    console.log("4. Function count word/phrase");

    if (str.length < phrase.length) {
        console.log("Input frasa pencarian tidak boleh lebih panjang dari string");
        return false;
    }

    var n = str.lastIndexOf(phrase);

    console.log(`${phrase} ditemukan ${n} kali`);
}

// 5. Function to show pyramid of string
const stringPyramid = (start, end) => {
    console.log("");
    console.log("5. Function to show pyramid of string");

    let num = [];
    let result = '';
    let container = document.getElementById("pyramid");

    for (let i = start; i <= end; i++) {
        if (i % 2 == 0) {
            num.push(i)
        }
    }

    
    for (let i = 0; i < num.length; i++) {
        for (let j = 0; j <= i; j++) {
            result += num[j] + ' ';
        }
        console.log(result);
        container.innerHTML += `${result} <br>`;
        result = '';
    }
}

// call function
// 1
getBiodata();

// 2
usernameValidation("dickyjulian")
passwordValidation("12345678i")

// 3
countVowels("zaza");

// 4
countPhrase("banananana", "nana");

// 5
stringPyramid(2, 10);