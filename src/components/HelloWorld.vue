<template>
	<div id="check">
	<button @click="isDatePickerShow0=true">dayPicker</button>
	<button @click="isDatePickerShow1=true">monthPicker</button>
	<div class="showdata">
	<span>currentPick：</span>
	<span>{{datePickerValue}}</span>
	</div>
		<!-- datePicker -->
		<div class="datepick">
			<md-picker
				ref="picker0"
				v-model="isDatePickerShow0"
				:data="pickerData"
				:cols="3"
				:default-value="pickerDefaultValue"
				is-cascade
				keep-index
				@confirm="onPickerConfirm(0)"
			></md-picker>
			<md-picker
				ref="picker1"
				v-model="isDatePickerShow1"
				:data="pickerData"
				:cols="2"
				:default-value="pickerDefaultValue"
				is-cascade
				keep-index
				@confirm="onPickerConfirm(1)"
			></md-picker>
		</div>
	</div>
</template>
<script>
import {Picker} from "mand-mobile";
// import checkList from "./components/checkList";
import days from "./28day";
export default {
	//The imported components need to be injected into the object to be used.
	components: {
		[Picker.name]: Picker
	},
	data() {
		// Store data here
		return {
			// 所有日期数据
			pickerData: [],
			monthArray: new Array(12).fill(1).map((v, k) => {
				let key = k + 1;
				let key1 = key;
				key = key < 10 ? String("0" + key) : String(key);
				return {label: key1 + "月", value: key};
			}),
			year: "",
			month: "",
			date: "",
			pickerValue: "",
			pickerDefaultIndex: [],
			pickerDefaultValue: [],
			// 最小日期
			minDate: new Date("2016/01/01"),
			// 最大
			maxDate: new Date(),
			// 展示日期日选择器及格式
			isDatePickerShow0: false,
			isDatePickerShow1: false,
			// 选中的日期
			datePickerValue: ""
		};
	},
	//监听属性 类似于data概念
	computed: {},
	//监控data中的数据变化
	watch: {},
	//方法集合
	methods: {
		// 选好日期后点击确定，筛选数据
		onPickerConfirm(index) {
			console.log("queren", this.pickerDefaultValue);

			const columnValues = this.$refs[`picker${index}`].getColumnValues();
			let value = "";
			columnValues.forEach(item => {
				value += `${item.value}/`;
			});
			console.log(`[Mand Mobile] Picker getColumnValues: ${value.substr(0, value.length - 1)}`);
			this.datePickerValue = value.substr(0, value.length - 1);
			this.$emit("pickdate",this.datePickerValue,index)
		},
		getDatetime(dataTime) {
			let month = dataTime.getMonth() + 1 < 10 ? String("0" + (dataTime.getMonth() + 1)) : String(dataTime.getMonth() + 1);
			let date = dataTime.getDate() < 10 ? String("0" + dataTime.getDate()) : String(dataTime.getDate());
			return [String(dataTime.getFullYear()), String(month), String(date)];
		},
		// 初始化日期
		initDate() {
			let pickerData = [];
			let startTimeArray = this.getDatetime(this.minDate); //['2016','01','01']
			let endTimeArray = this.getDatetime(this.maxDate); // 当天日期
			console.log("startTimeArray", startTimeArray);
			console.log("endTimeArray", endTimeArray);

			let yearDiff = endTimeArray[0] - startTimeArray[0] + 1;
			for (let i = 0; i < yearDiff + 1; i++) {
				let yearObj = {};
				let yearNum = startTimeArray[0] - 0 + i;
				// 如果年选为全部，那么月和日都是全部
				if (i == yearDiff) {
					yearObj.label = "全部";
					yearObj.value = "all";
					yearObj.children = [{label: "全部", value: "all"}];
					let v = yearObj.children[0];
					v.children = [{label: "全部", value: "all"}];
				} else {
					yearObj.label = yearNum + "年";
					yearObj.value = String(yearNum);
					// 定义月份的数组
					// this.monthArray;
					let monthObj = [];
					// 填充月份的数组，如果是今年，最大月份为当月
					if (yearObj.value == new Date().getFullYear()) {
						for (let m = 0; m <= new Date().getMonth(); m++) {
							let key = m + 1;
							let obj = {};
							obj.label = key + "月";
							// 月份小于10时，前面加0
							key = key < 10 ? String("0" + key) : String(key);
							obj.value = key;
							// 每个月份组成键值对
							monthObj.push(obj);
						}
						// 如果是今年以前，则有12个月
					} else {
						monthObj = JSON.parse(JSON.stringify(this.monthArray));
					}
					// 月份作为年的子集
					yearObj.children = monthObj;
					// 记录月份的长度（12）
					let monthlen = yearObj.children.length;
					for (let p = 0; p < monthlen; p++) {
						let v = yearObj.children[p];
						v.children = [];
						// (p == 1 && yearNum % 4 == 0 && yearNum % 100 != 0) || yearNum % 400 == 0
						// 获取当月的天数
						let dateNum = new Date(yearNum, p + 1, 0).getDate();
						// 如果是当年 当月，则天数最大为当天
						if (yearNum == new Date().getFullYear() && p == new Date().getMonth()) {
							for (let j = 0; j < new Date().getDate(); j++) {
								let dateObj = {};
								let dateNum = j + 1;
								dateObj.label = dateNum + "日";
								dateNum = dateNum < 10 ? String("0" + dateNum) : String(dateNum);
								dateObj.value = dateNum;
								v.children.push(dateObj);
							}
						} else {
							v.children = days["day" + dateNum];
						}
					}
				}
				pickerData.push(yearObj);
			}
			console.log(pickerData);
			return [pickerData];
		},
		// 弹出日期筛选器
		showPicker(val) {
			this[`isDatePickerShow${val}`] = true;
		},
	},
	beforeCreate() {
		setTimeout(() => {});
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
		// this.init();
		this.pickerData = this.initDate();
		let dateTimeArray = this.getDatetime(this.maxDate);
		console.log("dateTimeArray13213213", dateTimeArray);
		this.year = dateTimeArray[0];
		this.month = dateTimeArray[1];
		this.date = dateTimeArray[2];
		// 选择器默认选中当天
		this.pickerDefaultValue = dateTimeArray;
		// this.pickerDefaultValue = dateTimeArray;
	}
};
</script>
<style lang='less'>
#check {
	.datepick {
		.md-popup-box {
			background-color: #fff;
			border-radius: 0;
		}
		.md-popup-title-bar {
			background-color: #f8f8f8;
			border-radius: 0;
			height: 55px;
			& > div {
				padding: 20px 0;
				font-size: 16px;
			}
		}
		.title-bar-left {
			padding-left: 20px !important;
		}
		.title-bar-right {
			padding-right: 20px !important;
		}
		.column-item {
			font-size: 16px !important;
		}
		.md-picker-column-masker {
			left: 18px;
			right: 18px;
		}
	}
}

</style>