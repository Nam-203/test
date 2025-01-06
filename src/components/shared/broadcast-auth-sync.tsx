"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

import reactI18n from "~/config/i18n/react-i18n";
import { APP_ROUTES } from "~/config/routes";
import { EBroadcastAuthAction } from "~/shared/enums/broadcast.enum";
import { type TAuthBroadcastEvent } from "~/shared/utils/broadcast.util";
import { getFullUrl } from "~/shared/utils/common.util";

const BroadcastAuthSync = () => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});
	const router = useRouter();
	const queryClient = useQueryClient();
	const { t } = useTranslation(["common"], {
		i18n: reactI18n,
	});
	useEffect(() => {
		if (!sessionStorage.getItem("tabId")) {
			sessionStorage.setItem("tabId", nanoid());
		}

		const tabId = sessionStorage.getItem("tabId");

		const bc = new BroadcastChannel("auth");

		const handleBroadcast = (event: MessageEvent<TAuthBroadcastEvent>) => {
			// if (event.data.tabId === tabId) return

			if (
				event.data.action === EBroadcastAuthAction.LoggedIn &&
				getFullUrl(window.location.pathname, "") ===
					getFullUrl(APP_ROUTES.AUTH.LOGIN, "")
			) {
				setOnConfirm(() => () => {
					onClose();
					router.refresh();
				});
				onOpen();
			}

			if (
				event.data.action === EBroadcastAuthAction.LoggedOut &&
				event.data.tabId === tabId
			) {
				return;
			}

			if (event.data.action === EBroadcastAuthAction.LoggedOut) {
				queryClient.clear();
				setOnConfirm(() => () => {
					onClose();
					router.refresh();
				});
				onOpen();
			}
		};

		bc.addEventListener("message", handleBroadcast);

		return () => {
			bc.removeEventListener("message", handleBroadcast);
			bc.close();
		};
	}, []);

	return (
		<Modal
			backdrop="blur"
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			onClose={onConfirm}
			isDismissable={false}
			motionProps={{
				variants: {
					enter: {
						y: 0,
						opacity: 1,
						transition: {
							duration: 0.3,
							ease: "easeOut",
						},
					},
					exit: {
						y: -20,
						opacity: 0,
						transition: {
							duration: 0.2,
							ease: "easeIn",
						},
					},
				},
			}}
		>
			<ModalContent>
				<>
					<ModalHeader className="flex flex-col gap-1">
						{t("common:message.errorOccured")}
					</ModalHeader>
					<ModalBody>
						<p>{t("common:message.closeOrReload")}</p>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" variant="light" onPress={onConfirm}>
							Close
						</Button>
					</ModalFooter>
				</>
			</ModalContent>
		</Modal>
	);
};

export default BroadcastAuthSync;
