import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { ConditionalWrapper } from "../../../../../components/ConditionalWrapper/ConditionalWrapper";
import { Delays } from "../../../../../constants/Delays";
import { IDataCyProps } from "../../../../../domains/cypress/types/IDataCyProps";
import { useLazyState } from "../../../../../hooks/useLazyState/useLazyState";

export function CircleTextField(
  props: {
    value: string | undefined;
    readonly?: boolean;
    highlight?: boolean;
    button?: boolean;
    borderColor?: string;
    onChange?(value: string): void;
    onIncrement?(): void;
    onDecrement?(): void;
    onClick?(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
    onContextMenu?(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
  } & IDataCyProps
) {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useLazyState({
    value: props.value ?? "",
    delay: Delays.field,
    onChange: (newValue) => {
      props.onChange?.(newValue);
    },
  });

  const cursor = props.button ? "pointer !important" : "inherit";
  const areCounterButtonsVisible = hover || focus;

  return (
    <Box
      sx={{
        position: "relative",
        padding: ".2rem",
        cursor: cursor,
      }}
      onClick={(e) => {
        if (props.button) {
          props.onClick?.(e);
        }
        setHover(true);
      }}
      onContextMenu={(e) => {
        if (props.button) {
          props.onContextMenu?.(e);
        }
      }}
      onPointerEnter={() => {
        setHover(true);
      }}
      onPointerLeave={() => {
        setHover(false);
      }}
    >
      <ConditionalWrapper
        condition={props.button}
        wrapper={(children) => {
          return (
            <ButtonBase sx={{ borderRadius: "50%" }}>{children}</ButtonBase>
          );
        }}
      >
        <TextField
          variant="standard"
          type="number"
          data-cy={props.dataCy}
          value={value}
          sx={{
            textAlign: "center",
            cursor: cursor,
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          disabled={props.readonly || props.button}
          onChange={(e) => {
            if (!props.onChange) {
              return;
            }
            if (!e.target.value) {
              setValue("");
            } else {
              const parsed = parseInt(e.target.value);
              setValue(parsed.toString());
            }
          }}
          InputProps={{
            sx: {
              "cursor": cursor,
              "width": "5rem",
              "height": "3rem",
              "px": "0.5rem",
              "font-family": "monospace",
              "outline": "none",
              "background": (theme) => theme.palette.action.hover,
              "&&": {
                color: "inherit",
              },
              "&:before": {
                display: "none",
              },
              "&:after": {
                display: "none",
              },
              "transition": theme.transitions.create(["color", "background"], {
                duration: theme.transitions.duration.shortest,
              }),
            },
          }}
          inputProps={{
            sx: {
              "cursor": cursor,
              "fontWeight": theme.typography.fontWeightRegular,
              "textAlign": "center",
              // this disables the up/down browser arrows
              "padding": "0",
              "&.Mui-disabled": {
                WebkitTextFillColor: "unset",
              },
              "&[type=number]": {
                MozAppearance: "textfield",
              },
              "&::-webkit-outer-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "&::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </ConditionalWrapper>

      {!props.readonly && props.onDecrement && (
        <Fade in={areCounterButtonsVisible}>
          <IconButton
            data-cy={`${props.dataCy}.decrement`}
            sx={{
              "position": "absolute",
              "background": theme.palette.background.paper,
              "padding": "0",
              "left": "0",
              "bottom": "0",
              "&:hover": { background: theme.palette.background.default },
            }}
            onClick={props.onDecrement}
          >
            <RemoveCircleOutlineOutlinedIcon
              sx={{ width: "1.5rem", height: "1.5rem" }}
            />
          </IconButton>
        </Fade>
      )}
      {!props.readonly && props.onIncrement && (
        <Fade in={areCounterButtonsVisible}>
          <IconButton
            data-cy={`${props.dataCy}.increment`}
            sx={{
              "position": "absolute",
              "background": theme.palette.background.paper,
              "padding": "0",
              "right": "0",
              "bottom": "0",
              "&:hover": { background: theme.palette.background.default },
            }}
            onClick={props.onIncrement}
          >
            <AddCircleOutlineOutlinedIcon
              sx={{ width: "1.5rem", height: "1.5rem" }}
            />
          </IconButton>
        </Fade>
      )}
    </Box>
  );
}
