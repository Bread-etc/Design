export interface GetSceneListParams {
	accessToken: string;
	filter: {
		all: boolean;
		scenePolicyIDs: string[];
	};
	paging: {
		offset: number;
		size: number;
	};
}

export interface GetSceneListResult {
	paging: {
		nextOffset: number;
	};
	results: {
		scenePolicyID: number;
		scenePolicyName: string;
		scenePolicyType: string;
		description: string;
	}[];
}
