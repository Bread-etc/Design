import type { DeviceListParams } from "@/api/interface/DeviceList";
import type { DeviceTypeListParams } from "@/api/interface/DeviceTypeList";
import type { HardwareListParams } from "@/api/interface/HardwareList";
import type { HardwareTypeListParams } from "@/api/interface/HardwareTypeList";
import deviceListService from "@/api/service/deviceListService";
import deviceTypeService from "@/api/service/deviceTypeService";
import hardwareListService from "@/api/service/hardwareListService";
import hardwareTypeListService from "@/api/service/hardwareTypeListService";
import { ref } from "vue";

// 选项列表的响应式数据
const hardwareTypes = ref<{ id: string; name: string }[]>([]);
const hardwareIDs = ref<{ id: string; name: string }[]>([]);
const deviceTypes = ref<{ id: string; name: string }[]>([]);
const deviceIDs = ref<{ id: string; name: string }[]>([]);

// 获取硬件类型和硬件ID
const fetchHardwareOptions = async (accessToken: string) => {
	try {
		const typeParams: HardwareTypeListParams = {
			accessToken,
			fields: ["info", "states", "configs"],
			filter: {
				all: true,
				hardwareTypeIDs: [""],
				hardwareTypeName: [""],
				labelNames: [""],
				manufactoryTypes: ["sundray"],
			},
		};
		const params: HardwareListParams = {
			accessToken,
			fields: ["info", "states", "configs"],
			filter: {
				all: true,
				hardwareClassifications: ["gateway", "terminal"],
				hardwareTypeIDs: [""],
				hardwareTypeNames: [""],
				hardwareIDs: [""],
				hardwareNames: [""],
				hardwareStatus: ["online", "offline"],
				spaceIDs: [],
				spaceNames: [""],
				spaceRecursive: true,
			},
			order: {
				field: "info",
				key: "",
				orderBy: "asc",
			},
			paging: {
				offset: null,
				size: null,
			},
		};

		const typeRes = await hardwareTypeListService.hardwareTypeList(typeParams);
		const res = await hardwareListService.hardwareList(params);

		// 解析硬件类型数据
		hardwareTypes.value =
			typeRes.data.map((item) => ({
				id: item.hardwareTypeID,
				name: item.info.hardwareTypeName,
			})) || [];

		// 解析硬件ID数据
		hardwareIDs.value =
			res.data.results.map((item) => ({
				id: item.hardwareID,
				name: item.hardwareID,
			})) || [];
	} catch (error) {
		console.error("获取硬件列表失败", error);
	}
};

// 获取设备类型和设备ID
const fetchDeviceOptions = async (accessToken: string) => {
	try {
		const typeParams: DeviceTypeListParams = {
			accessToken,
			fields: ["info", "states"],
			filter: {
				all: true,
				deviceTypeIDs: [""],
				deviceTypeNames: [""],
				deviceClassification: [""],
			},
		};
		const params: DeviceListParams = {
			accessToken,
			fields: ["info", "states"],
			filter: {
				all: true,
				deviceTypeIDs: [""],
				deviceTypeNames: [""],
				deviceIDs: [""],
				deviceNames: [""],
				deviceStatus: ["normal", "abnormal"],
				spaceIDs: [],
				spaceNames: [""],
				spaceRecursive: true,
				labelIDs: [],
				labelNames: [""],
			},
			order: {
				field: "info",
				key: "",
				orderBy: "asc",
			},
			paging: {
				offset: null,
				size: null,
			},
		};

		const typeRes = await deviceTypeService.deviceTypeList(typeParams);
		const res = await deviceListService.deviceList(params);

		// 解析设备类型数据
		deviceTypes.value =
			typeRes.data.map((item) => ({
				id: item.deviceTypeID,
				name: item.info.deviceTypeName,
			})) || [];

		// 解析设备ID数据
		deviceIDs.value =
			res.data.results.map((item) => ({
				id: item.deviceID,
				name: item.deviceID,
			})) || [];
	} catch (error) {
		console.error("获取设备列表失败", error);
	}
};

// 导出方法和数据
export function useHardwareAndDeviceOptions() {
	return {
		hardwareTypes,
		hardwareIDs,
		deviceTypes,
		deviceIDs,
		fetchHardwareOptions,
		fetchDeviceOptions,
	};
}
