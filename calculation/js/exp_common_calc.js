function findReturnerLv(exp, b, sokomin) {
    //厳密には598とかで満たすことあるけど、今回は計算にいれない。
    var cnt = 1;
    var ret = {
        lv: 1,
        per: 0,
        rest: 0,
    };
    if (b === 4) {
        for (var i = 0; i <= 1500; i++) {
            if (exp < exp_sum_2017array[i]) {
                var sup_exp = 1;
                //TODO こんな方法で上位レベルの壺PTどうにかする方法聞いたことないぞ。。。
                if (sokomin && i > 999) {
                    sup_exp = (i < 1075) ? Math.sqrt(Math.sqrt(75 / (1075 - i))) : 75;
                }
                var rest = exp - parseInt(exp_sum_2017array[i - 1] * sup_exp);
                ret.rest = rest;
                ret.per = parseInt((rest * 100 / exp_2017array[i]) * 10000) / 10000;
                ret.lv = cnt;
                return ret;
            } else {
                if (i === 1500) {
                    ret.lv = 1500;
                    ret.per = 0;
                }
                cnt++;
            }
        }
        //b=１はLvリセットなので対応不要
    } else if (b === 2) {
        for (var i = 1; i <= 909; i++) {
            if (exp < exp_sum_2017array[i - 1]) {
                var rest = i >= 1 ? exp - exp_sum_2017array[i - 2] : 250;
                ret.rest = rest;
                ret.per = parseInt((rest * 100 / exp_2017array[i - 1]) * 10000) / 10000;
                ret.lv = cnt;
                return ret;
            } else {
                cnt++;
            }
        }
        cnt--;
        for (var i = 910; i <= 1000; i++) {
            if (exp < exp_sum_2011array[i - 910]) {
                var rest = i >= 910 ? exp - exp_sum_2011array[i - 911] : exp - exp_sum_2017array[i - 1];
                ret.rest = rest;
                ret.per = parseInt((rest * 100 / exp_2011array[i - 910]) * 10000) / 10000;
                ret.lv = cnt;
                return ret;
            } else {
                cnt++;
            }
        }
    } else if (b === 3) {
        for (var i = 1; i <= 909; i++) {
            if (exp < exp_sum_2017array[i - 1]) {
                var rest = i >= 1 ? exp - exp_sum_2017array[i - 2] : 250;
                ret.rest = rest;
                ret.per = parseInt((rest * 100 / exp_2017array[i - 1]) * 10000) / 10000;
                ret.lv = cnt;
                return ret;
            } else {
                cnt++;
            }
        }
        cnt--;
        for (var i = 910; i <= 1000; i++) {
            if (exp < exp_sum_2015array[i - 910]) {
                var rest = i >= 910 ? exp - exp_sum_2015array[i - 911] : exp - exp_sum_2017array[i - 1];
                ret.rest = rest;
                ret.per = parseInt((rest * 100 / exp_2015array[i - 910]) * 10000) / 10000;
                ret.lv = cnt;
                return ret;
            } else {
                cnt++;
            }
        }
    } else if (b === 5) {
        for (var i = 1; i <= 850; i++) {
            if (exp < exp_sum_2017array[i - 1]) {
                var rest = i >= 1 ? exp - exp_sum_2017array[i - 2] : 250;
                ret.rest = rest;
                ret.per = parseInt((rest * 100 / exp_2017array[i - 1]) * 10000) / 10000;
                ret.lv = cnt;
                return ret;
            } else {
                cnt++;
            }
        }
        cnt--;
        for (var i = 851; i <= 1500; i++) {
            //FIXME こんな方法で上位レベルの壺PTどうにかする方法聞いたことないぞ。。。
            var sup_exp = 1;
            if (sokomin && i > 999) {
                sup_exp = (i < 1075) ? Math.sqrt(Math.sqrt(75 / (1075 - i))) : 75;
            }
            if (exp < parseInt(exp_sum_2019array[i - 851] * sup_exp)) {
                var rest = i >= 852 ? exp - parseInt(exp_sum_2019array[i - 852] * sup_exp) : exp - exp_sum_2017array[i - 1];
                ret.rest = rest;
                if (i >= 1000) {
                    ret.per = (parseInt((rest * 100 / exp_2017array[i - 2]) * 10000) / 10000) > 0 ?
                        (parseInt((rest * 100 / exp_2017array[i - 2]) * 10000) / 10000) : 0;
                } else {
                    ret.per = parseInt((rest * 100 / exp_2019array[i - 851]) * 10000) / 10000;
                }
                ret.lv = cnt;
                return ret;
            } else {
                if (i === 1500) {
                    ret.lv = 1500;
                    ret.per = 0;
                }
                cnt++;
            }
        }
    }
    return ret;
}
