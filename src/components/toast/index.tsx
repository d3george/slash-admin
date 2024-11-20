import { useSettings } from "@/store/settingStore";
import { useThemeToken } from "@/theme/hooks";

import type { GlobalToken } from "antd";
import { Toaster } from "sonner";
import styled from "styled-components";
import Iconify from "../icon/iconify-icon";

/**
 * https://sonner.emilkowal.ski/getting-started
 */
export default function Toast() {
	const { themeMode } = useSettings();
	const theme = useThemeToken();
	const {
		colorInfo,
		colorSuccess,
		colorWarning,
		colorError,
		colorBgContainer,
	} = theme;

	return (
		<ToasterStyleWrapper $theme={theme}>
			<Toaster
				position="top-right"
				theme={themeMode}
				toastOptions={{
					duration: 3000,
					style: {
						backgroundColor: colorBgContainer,
					},
					classNames: {
						toast: "rounded-lg border-0",
						description: "text-xs text-current/45",
						content: "flex-1 ml-2",
						icon: "flex items-center justify-center px-4 rounded-lg",
						success: "bg-success/10",
						error: "bg-error/10",
						warning: "bg-warning/10",
						info: "bg-info/10",
					},
				}}
				icons={{
					success: (
						<div className="p-2 bg-success/10 rounded-lg">
							<Iconify
								icon="carbon:checkmark-filled"
								size={24}
								color={colorSuccess}
							/>
						</div>
					),
					error: (
						<div className="p-2 bg-error/10 rounded-lg">
							<Iconify
								icon="carbon:warning-hex-filled"
								size={24}
								color={colorError}
							/>
						</div>
					),
					warning: (
						<div className="p-2 bg-warning/10 rounded-lg">
							<Iconify
								icon="carbon:warning-alt-filled"
								size={24}
								color={colorWarning}
							/>
						</div>
					),
					info: (
						<div className="p-2 bg-info/10 rounded-lg">
							<Iconify
								icon="carbon:information-filled"
								size={24}
								color={colorInfo}
							/>
						</div>
					),
					loading: (
						<div className="p-2 bg-gray-400/10 text-gray-400 rounded-lg">
							<Iconify
								icon="svg-spinners:6-dots-scale-middle"
								size={24}
								speed={3}
							/>
						</div>
					),
				}}
				expand
			/>
		</ToasterStyleWrapper>
	);
}

const ToasterStyleWrapper = styled.div<{ $theme: GlobalToken }>`
  [data-sonner-toast] {
    font-weight: 600;
    font-size: 14px;

    [data-cancel] {
      color: ${(props) => props.$theme.colorTextBase};
      background-color: transparent;
      &:hover {
        background-color: ${(props) => props.$theme.colorBgTextHover};
      }
    }

    /* Default */
    [data-action] {
      color: ${(props) => props.$theme.colorPrimary};
      background-color: transparent;
      &:hover {
        background-color: ${(props) => props.$theme.colorPrimaryBgHover};
      }
    }

    /* Info */
    &[data-type="info"] [data-action] {
      color: ${(props) => props.$theme.colorInfo};
      background-color: transparent;
      &:hover {
        background-color: ${(props) => props.$theme.colorInfoBgHover};
      }
    }

    /* Error */
    &[data-type="error"] [data-action] {
      color: ${(props) => props.$theme.colorError};
      background-color: transparent;
      &:hover {
        background-color: ${(props) => props.$theme.colorErrorBgHover};
      }
    }

    /* Success */
    &[data-type="success"] [data-action] {
      color: ${(props) => props.$theme.colorSuccess};
      background-color: transparent;
      &:hover {
        background-color: ${(props) => props.$theme.colorSuccessBgHover};
      }
    }

    /* Warning */
    &[data-type="warning"] [data-action] {
      color: ${(props) => props.$theme.colorWarning};
      background-color: transparent;
      &:hover {
        background-color: ${(props) => props.$theme.colorWarningBgHover};
      }
    }

    /* Close Button */
    [data-close-button] {
      top: 0;
      right: 0;
      left: auto;
      border: 1px solid ${(props) => props.$theme.colorBorder};
      border-style: dashed;
      background-color: ${(props) => props.$theme.colorBgContainer};
    }
  }
`;
