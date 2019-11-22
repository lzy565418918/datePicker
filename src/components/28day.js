
const productDays=(days)=>{
    let daysArray=[];
    for(let i=0;i<days-0;i++){
        let key =i+1+'';
        let obj={};
        obj.label=key+'日';
        key = key < 10 ? String("0" + key) : String(key);
        obj.value=key;
        daysArray.push(obj);
    }
    return daysArray
}
const day28=productDays(28);
const day29=[...day28,{
    label:'29日',
    value:'29'
}]
const day30=[...day29,{
    label:'30日',
    value:'30'
}]
const day31=[...day30,{
    label:'31日',
    value:'31'
}]
export default {
    day28,day29,day30,day31,productDays
}