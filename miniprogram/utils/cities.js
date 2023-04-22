const cities = {
    "msg": "success",
    "code": 1,
    "data": {
        "1": [
            {
                "key": "zibo",
                "name": {
                    "cn": "淄博",
                    "en": "Zibo"
                },
                "cats": ["household", "residual", "recyclable", "hazardous"],
                "i": "sh"
            },{
            "key": "shanghai",
            "name": {
                "cn": "上海",
                "en": "Shanghai"
            },
            "cats": ["household", "residual", "recyclable", "hazardous"],
            "i": "sh"
        }, {
            "key": "xian",
            "name": {
                "cn": "西安",
                "en": "Xi'an"
            },
            "cats": ["kitchen1", "other2", "recyclable", "hazardous"],
            "i": "xa"
        }, {
            "key": "chengdu",
            "name": {
                "cn": "成都",
                "en": "Chengdu"
            },
            "cats": ["kitchen2", "other", "recyclable", "hazardous"],
            "i": "cd"
        }, {
            "key": "guangzhou",
            "name": {
                "cn": "广州",
                "en": "Guangzhou"
            },
            "cats": ["kitchen2", "other2", "recyclable", "hazardous"],
            "i": "gz"
        }, {
            "key": "ningbo",
            "name": {
                "cn": "宁波",
                "en": "Ningbo"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "nb"
        }, {
            "key": "xiamen",
            "name": {
                "cn": "厦门",
                "en": "Xiamen"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "xm"
        }, {
            "key": "yichun",
            "name": {
                "cn": "宜春",
                "en": "Yichun"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "yc"
        }, {
            "key": "taiyuan",
            "name": {
                "cn": "太原",
                "en": "Taiyuan"
            },
            "cats": ["perishable", "other", "recyclable", "hazardous"],
            "i": "ty"
        }, {
            "key": "hangzhou",
            "name": {
                "cn": "杭州",
                "en": "Hangzhou"
            },
            "cats": ["perishable", "other", "recyclable", "hazardous"],
            "i": "hz"
        }, {
            "key": "chongqing",
            "name": {
                "cn": "重庆",
                "en": "Chongqing"
            },
            "cats": ["perishable", "other", "recyclable", "hazardous"],
            "i": "cq"
        }, {
            "key": "shijiazhuang",
            "name": {
                "cn": "石家庄",
                "en": "Shijiazhuang"
            },
            "cats": ["perishable", "other", "recyclable", "hazardous"],
            "i": "sjz"
        }, {
            "key": "handan",
            "name": {
                "cn": "邯郸",
                "en": "Handan"
            },
            "cats": ["household", "residual", "recyclable", "hazardous"],
            "i": "hd"
        }, {
            "key": "shenyang",
            "name": {
                "cn": "沈阳",
                "en": "Shenyang"
            },
            "cats": ["kitchen2", "other", "recyclable", "hazardous"],
            "i": "sy"
        }, {
            "key": "dalian",
            "name": {
                "cn": "大连",
                "en": "Dalian"
            },
            "cats": ["perishable", "other", "recyclable", "hazardous"],
            "i": "dl"
        }, {
            "key": "changchun",
            "name": {
                "cn": "长春",
                "en": "Changchun"
            },
            "cats": ["perishable", "other", "recyclable", "hazardous"],
            "i": "cc"
        }, {
            "key": "harbin",
            "name": {
                "cn": "哈尔滨",
                "en": "Harbin"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "heb"
        }, {
            "key": "nanjing",
            "name": {
                "cn": "南京",
                "en": "Nanjing"
            },
            "cats": ["kitchen2", "other", "recyclable", "hazardous"],
            "i": "nj"
        }, {
            "key": "suzhou",
            "name": {
                "cn": "苏州",
                "en": "Suzhou"
            },
            "cats": ["perishable", "other", "recyclable", "hazardous"],
            "i": "sz"
        }, {
            "key": "hefei",
            "name": {
                "cn": "合肥",
                "en": "Hefei"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "hf"
        }, {
            "key": "tongling",
            "name": {
                "cn": "铜陵",
                "en": "Tongling"
            },
            "cats": ["perishable", "other", "recyclable", "hazardous"],
            "i": "tl"
        }, {
            "key": "fuzhou",
            "name": {
                "cn": "福州",
                "en": "Fuzhou"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "fz"
        }, {
            "key": "jinan",
            "name": {
                "cn": "济南",
                "en": "Jinan"
            },
            "cats": ["kitchen2", "other", "recyclable", "hazardous"],
            "i": "jn"
        }, {
            "key": "taian",
            "name": {
                "cn": "泰安",
                "en": "Taian"
            },
            "cats": ["kitchen2", "other", "recyclable", "hazardous"],
            "i": "ta"
        }, {
            "key": "qingdao",
            "name": {
                "cn": "青岛",
                "en": "Qingdao"
            },
            "cats": ["kitchen2", "other", "recyclable", "hazardous"],
            "i": "qd"
        }, {
            "key": "yichang",
            "name": {
                "cn": "宜昌",
                "en": "Yichang"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "yc"
        }, {
            "key": "changsha",
            "name": {
                "cn": "长沙",
                "en": "Changsha"
            },
            "cats": ["perishable", "other", "recyclable", "hazardous"],
            "i": "cs"
        }, {
            "key": "shenzhen",
            "name": {
                "cn": "深圳",
                "en": "Shenzhen"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "sz"
        }, {
            "key": "nanning",
            "name": {
                "cn": "南宁",
                "en": "Nanning"
            },
            "cats": ["perishable", "other", "recyclable", "hazardous"],
            "i": "nn"
        }, {
            "key": "haikou",
            "name": {
                "cn": "海口",
                "en": "Haikou"
            },
            "cats": ["perishable", "other", "recyclable", "hazardous"],
            "i": "hk"
        }, {
            "key": "guangyuan",
            "name": {
                "cn": "广元",
                "en": "Guangyuan"
            },
            "cats": ["kitchen2", "other", "recyclable", "hazardous"],
            "i": "gy"
        }, {
            "key": "deyang",
            "name": {
                "cn": "德阳",
                "en": "Deyang"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "dy"
        }, {
            "key": "guiyang",
            "name": {
                "cn": "贵阳",
                "en": "Guiyang"
            },
            "cats": ["perishable", "other", "recyclable", "hazardous"],
            "i": "gy"
        }, {
            "key": "kunming",
            "name": {
                "cn": "昆明",
                "en": "Kunming"
            },
            "cats": ["perishable", "other", "recyclable", "hazardous"],
            "i": "km"
        }, {
            "key": "lhasa",
            "name": {
                "cn": "拉萨",
                "en": "Lhasa"
            },
            "cats": ["kitchen2", "other", "recyclable", "hazardous"],
            "i": "ls"
        }, {
            "key": "xianyang",
            "name": {
                "cn": "咸阳",
                "en": "Xianyang"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "xy"
        }, {
            "key": "lanzhou",
            "name": {
                "cn": "兰州",
                "en": "Lanzhou"
            },
            "cats": ["perishable", "other", "recyclable", "hazardous"],
            "i": "lz"
        }, {
            "key": "xining",
            "name": {
                "cn": "西宁",
                "en": "Xining"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "xn"
        }, {
            "key": "yinchuan",
            "name": {
                "cn": "银川",
                "en": "Yinchuan"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "yc"
        }, {
            "key": "beijing",
            "name": {
                "cn": "北京",
                "en": "Beijing"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "bj"
        }, {
            "key": "zhengzhou",
            "name": {
                "cn": "郑州",
                "en": "Zhengzhou"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "zz"
        }, {
            "key": "wuhu",
            "name": {
                "cn": "芜湖",
                "en": "Wuhu"
            },
            "cats": ["kitchen2", "other", "recyclable", "hazardous"],
            "i": "wh"
        }, {
            "key": "tianjin",
            "name": {
                "cn": "天津",
                "en": "Tianjin"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "tj"
        }, {
            "key": "wuhan",
            "name": {
                "cn": "武汉",
                "en": "Wuhan"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "wh"
        }, {
            "key": "urumqi",
            "name": {
                "cn": "乌鲁木齐",
                "en": "Urumqi"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "wlmq"
        }, {
            "key": "nanchang",
            "name": {
                "cn": "南昌",
                "en": "Nanchang"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "nc"
        }, {
            "key": "shigatse",
            "name": {
                "cn": "日喀则",
                "en": "Shigatse"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "rkz"
        }, {
            "key": "hohhot",
            "name": {
                "cn": "呼和浩特",
                "en": "Hohhot"
            },
            "cats": ["kitchen1", "other", "recyclable", "hazardous"],
            "i": "hhht"
        }, {
            "key": "quzhou",
            "name": {
                "cn": "衢州",
                "en": "QuZhou"
            },
            "cats": ["perishable2", "other3", "recyclable2", "hazardous2"],
            "i": "qz"
        }]
    }
}
module.exports = cities