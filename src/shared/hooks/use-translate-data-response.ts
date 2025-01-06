import { useEffect, useState } from "react";

function useTranslatedData<T>(data: T[], t: unknown): T[] {
	const [translatedData, setTranslatedData] = useState<T[]>([]);

	useEffect(() => {
		const newTranslatedData = data.map((item) => ({
			...item,
		}));
		setTranslatedData(newTranslatedData);
	}, [data, t]);

	return translatedData;
}

export default useTranslatedData;
