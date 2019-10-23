import React from "react";

export const THEME_COLOR = "#00b284";
const THEME_COLOR_HOVER = "#0af1b5";

const CSSFiles = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx global>
        {`
          body {
            background-color: #e5e5e5;
          }

          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px white inset !important;
          }

          /* Document
 * ========================================================================== */

          /**
 * 1. Remove repeating backgrounds in all browsers (opinionated).
 * 2. Add border box sizing in all browsers (opinionated).
 */

          *,
          ::before,
          ::after {
            background-repeat: no-repeat; /* 1 */
            box-sizing: border-box; /* 2 */
          }

          /**
  * 1. Add text decoration inheritance in all browsers (opinionated).
  * 2. Add vertical alignment inheritance in all browsers (opinionated).
  */

          ::before,
          ::after {
            text-decoration: inherit; /* 1 */
            vertical-align: inherit; /* 2 */
          }

          /**
  * 1. Use the default cursor in all browsers (opinionated).
  * 2. Use the default user interface font in all browsers (opinionated).
  * 3. Correct the line height in all browsers.
  * 4. Use a 4-space tab width in all browsers (opinionated).
  * 5. Prevent adjustments of font size after orientation changes in
  *    IE on Windows Phone and in iOS.
  * 6. Breaks words to prevent overflow in all browsers (opinionated).
  */

          html {
            cursor: default; /* 1 */
            font-family: system-ui, /* macOS 10.11-10.12 */ -apple-system,
              /* Windows 6+ */ Segoe UI, /* Android 4+ */ Roboto,
              /* Ubuntu 10.10+ */ Ubuntu, /* Gnome 3+ */ Cantarell,
              /* KDE Plasma 5+ */ Noto Sans, /* fallback */ sans-serif,
              /* macOS emoji */ "Apple Color Emoji",
              /* Windows emoji */ "Segoe UI Emoji",
              /* Windows emoji */ "Segoe UI Symbol",
              /* Linux emoji */ "Noto Color Emoji"; /* 2 */

            line-height: 1.15; /* 3 */
            -moz-tab-size: 4; /* 4 */
            tab-size: 4; /* 4 */
            -ms-text-size-adjust: 100%; /* 5 */
            -webkit-text-size-adjust: 100%; /* 5 */
            word-break: break-word; /* 6 */
          }

          /* Sections
  * ========================================================================== */

          /**
  * Remove the margin in all browsers (opinionated).
  */

          body {
            margin: 0;
          }

          /**
  * Correct the font size and margin on h1 elements within section and
  * article contexts in Chrome, Firefox, and Safari.
  */

          h1 {
            font-size: 2em;
            margin: 0.67em 0;
          }

          /* Grouping content
  * ========================================================================== */

          /**
  * 1. Add the correct sizing in Firefox.
  * 2. Show the overflow in Edge and IE.
  */

          hr {
            height: 0; /* 1 */
            overflow: visible; /* 2 */
          }

          /**
  * Add the correct display in IE.
  */

          main {
            display: block;
          }

          /**
  * Remove the list style on navigation lists in all browsers (opinionated).
  */

          nav ol,
          nav ul {
            list-style: none;
          }

          /**
  * 1. Use the default monospace user interface font
  *    in all browsers (opinionated).
  * 2. Correct the odd em font sizing in all browsers.
  */

          pre {
            font-family:
     /* macOS 10.10+ */ Menlo, /* Windows 6+ */ Consolas,
              /* Android 4+ */ Roboto Mono, /* Ubuntu 10.10+ */ Ubuntu Monospace,
              /* KDE Plasma 5+ */ Noto Mono, /* KDE Plasma 4+ */ Oxygen Mono,
              /* Linux/OpenOffice fallback */ Liberation Mono,
              /* fallback */ monospace; /* 1 */

            font-size: 1em; /* 2 */
          }

          /* Text-level semantics
  * ========================================================================== */

          /**
  * Remove the gray background on active links in IE 10.
  */

          a {
            background-color: transparent;
          }

          /**
  * Add the correct text decoration in Edge, IE, Opera, and Safari.
  */

          abbr[title] {
            text-decoration: underline;
            text-decoration: underline dotted;
          }

          /**
  * Add the correct font weight in Chrome, Edge, and Safari.
  */

          b,
          strong {
            font-weight: bolder;
          }

          /**
  * 1. Use the default monospace user interface font
  *    in all browsers (opinionated).
  * 2. Correct the odd em font sizing in all browsers.
  */

          code,
          kbd,
          samp {
            font-family:
     /* macOS 10.10+ */ Menlo, /* Windows 6+ */ Consolas,
              /* Android 4+ */ Roboto Mono, /* Ubuntu 10.10+ */ Ubuntu Monospace,
              /* KDE Plasma 5+ */ Noto Mono, /* KDE Plasma 4+ */ Oxygen Mono,
              /* Linux/OpenOffice fallback */ Liberation Mono,
              /* fallback */ monospace; /* 1 */

            font-size: 1em; /* 2 */
          }

          /**
  * Add the correct font size in all browsers.
  */

          small {
            font-size: 80%;
          }

          /*
  * Remove the text shadow on text selections in Firefox 61- (opinionated).
  * 1. Restore the coloring undone by defining the text shadow
  *    in all browsers (opinionated).
  */

          ::-moz-selection {
            background-color: #b3d4fc; /* 1 */
            color: #000; /* 1 */
            text-shadow: none;
          }

          ::selection {
            background-color: #b3d4fc; /* 1 */
            color: #000; /* 1 */
            text-shadow: none;
          }

          /* Embedded content
  * ========================================================================== */

          /*
  * Change the alignment on media elements in all browers (opinionated).
  */

          audio,
          canvas,
          iframe,
          img,
          svg,
          video {
            vertical-align: middle;
          }

          /**
  * Add the correct display in IE 9-.
  */

          audio,
          video {
            display: inline-block;
          }

          /**
  * Add the correct display in iOS 4-7.
  */

          audio:not([controls]) {
            display: none;
            height: 0;
          }

          /**
  * Remove the border on images inside links in IE 10-.
  */

          img {
            border-style: none;
          }

          /**
  * Change the fill color to match the text color in all browsers (opinionated).
  */

          svg:not([fill]) {
            fill: currentColor;
          }

          /**
  * Hide the overflow in IE.
  */

          svg:not(:root) {
            overflow: hidden;
          }

          /* Tabular data
  * ========================================================================== */

          /**
  * Collapse border spacing in all browsers (opinionated).
  */

          table {
            border-collapse: collapse;
          }

          /* Forms
  * ========================================================================== */

          /**
  * Inherit styling in all browsers (opinionated).
  */

          button,
          input,
          select,
          textarea {
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
          }

          /**
  * Remove the margin in Safari.
  */

          button,
          input,
          select {
            margin: 0;
          }

          /**
  * 1. Show the overflow in IE.
  * 2. Remove the inheritance of text transform in Edge, Firefox, and IE.
  */

          button {
            overflow: visible; /* 1 */
            text-transform: none; /* 2 */
          }

          /**
  * Correct the inability to style clickable types in iOS and Safari.
  */

          button,
          [type="button"],
          [type="reset"],
          [type="submit"] {
            -webkit-appearance: button;
          }

          /**
  * Correct the padding in Firefox.
  */

          fieldset {
            padding: 0.35em 0.75em 0.625em;
          }

          /**
  * Show the overflow in Edge and IE.
  */

          input {
            overflow: visible;
          }

          /**
  * 1. Correct the text wrapping in Edge and IE.
  * 2. Correct the color inheritance from fieldset elements in IE.
  */

          legend {
            color: inherit; /* 2 */
            display: table; /* 1 */
            max-width: 100%; /* 1 */
            white-space: normal; /* 1 */
          }

          /**
  * 1. Add the correct display in Edge and IE.
  * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.
  */

          progress {
            display: inline-block; /* 1 */
            vertical-align: baseline; /* 2 */
          }

          /**
  * Remove the inheritance of text transform in Firefox.
  */

          select {
            text-transform: none;
          }

          /**
  * 1. Remove the margin in Firefox and Safari.
  * 2. Remove the default vertical scrollbar in IE.
  * 3. Change the resize direction on textareas in all browsers (opinionated).
  */

          textarea {
            margin: 0; /* 1 */
            overflow: auto; /* 2 */
            resize: vertical; /* 3 */
          }

          /**
  * Remove the padding in IE 10-.
  */

          [type="checkbox"],
          [type="radio"] {
            padding: 0;
          }

          /**
  * 1. Correct the odd appearance in Chrome and Safari.
  * 2. Correct the outline style in Safari.
  */

          [type="search"] {
            -webkit-appearance: textfield; /* 1 */
            outline-offset: -2px; /* 2 */
          }

          /**
  * Correct the cursor style of increment and decrement buttons in Safari.
  */

          ::-webkit-inner-spin-button,
          ::-webkit-outer-spin-button {
            height: auto;
          }

          /**
  * Correct the text style of placeholders in Chrome, Edge, and Safari.
  */

          ::-webkit-input-placeholder {
            color: inherit;
            opacity: 0.54;
          }

          /**
  * Remove the inner padding in Chrome and Safari on macOS.
  */

          ::-webkit-search-decoration {
            -webkit-appearance: none;
          }

          /**
  * 1. Correct the inability to style clickable types in iOS and Safari.
  * 2. Change font properties to inherit in Safari.
  */

          ::-webkit-file-upload-button {
            -webkit-appearance: button; /* 1 */
            font: inherit; /* 2 */
          }

          /**
  * Remove the inner border and padding of focus outlines in Firefox.
  */

          ::-moz-focus-inner {
            border-style: none;
            padding: 0;
          }

          /**
  * Restore the focus outline styles unset by the previous rule in Firefox.
  */

          :-moz-focusring {
            outline: 1px dotted ButtonText;
          }

          /* Interactive
  * ========================================================================== */

          /*
  * Add the correct display in Edge and IE.
  */

          details {
            display: block;
          }

          /*
  * Add the correct styles in Edge, IE, and Safari.
  */

          dialog {
            background-color: white;
            border: solid;
            color: black;
            display: block;
            height: -moz-fit-content;
            height: -webkit-fit-content;
            height: fit-content;
            left: 0;
            margin: auto;
            padding: 1em;
            position: absolute;
            right: 0;
            width: -moz-fit-content;
            width: -webkit-fit-content;
            width: fit-content;
          }

          dialog:not([open]) {
            display: none;
          }

          /*
  * Add the correct display in all browsers.
  */

          summary {
            display: list-item;
          }

          /* Scripting
  * ========================================================================== */

          /**
  * Add the correct display in IE 9-.
  */

          canvas {
            display: inline-block;
          }

          /**
  * Add the correct display in IE.
  */

          template {
            display: none;
          }

          /* User interaction
  * ========================================================================== */

          /*
  * 1. Remove the tapping delay in IE 10.
  * 2. Remove the tapping delay on clickable elements
       in all browsers (opinionated).
  */

          a,
          area,
          button,
          input,
          label,
          select,
          summary,
          textarea,
          [tabindex] {
            -ms-touch-action: manipulation; /* 1 */
            touch-action: manipulation; /* 2 */
          }

          /**
  * Add the correct display in IE 10-.
  */

          [hidden] {
            display: none;
          }

          /* Accessibility
  * ========================================================================== */

          /**
  * Change the cursor on busy elements in all browsers (opinionated).
  */

          [aria-busy="true"] {
            cursor: progress;
          }

          /*
  * Change the cursor on control elements in all browsers (opinionated).
  */

          [aria-controls] {
            cursor: pointer;
          }

          /*
  * Change the cursor on disabled, not-editable, or otherwise
  * inoperable elements in all browsers (opinionated).
  */

          [aria-disabled="true"],
          [disabled] {
            cursor: not-allowed;
          }

          /*
  * Change the display on visually hidden accessible elements
  * in all browsers (opinionated).
  */

          [aria-hidden="false"][hidden]:not(:focus) {
            clip: rect(0, 0, 0, 0);
            display: inherit;
            position: absolute;
          }

          .Toastify__toast-container {
            z-index: 9999;
            -webkit-transform: translate3d(0, 0, 9999px);
            position: fixed;
            padding: 4px;
            width: 320px;
            box-sizing: border-box;
            color: #fff;
          }
          .Toastify__toast-container--top-left {
            top: 1em;
            left: 1em;
          }
          .Toastify__toast-container--top-center {
            top: 1em;
            left: 50%;
            margin-left: -160px;
          }
          .Toastify__toast-container--top-right {
            top: 1em;
            right: 1em;
          }
          .Toastify__toast-container--bottom-left {
            bottom: 1em;
            left: 1em;
          }
          .Toastify__toast-container--bottom-center {
            bottom: 1em;
            left: 50%;
            margin-left: -160px;
          }
          .Toastify__toast-container--bottom-right {
            bottom: 1em;
            right: 1em;
          }

          @media only screen and (max-width: 480px) {
            .Toastify__toast-container {
              width: 100vw;
              padding: 0;
              left: 0;
              margin: 0;
            }
            .Toastify__toast-container--top-left,
            .Toastify__toast-container--top-center,
            .Toastify__toast-container--top-right {
              top: 0;
            }
            .Toastify__toast-container--bottom-left,
            .Toastify__toast-container--bottom-center,
            .Toastify__toast-container--bottom-right {
              bottom: 0;
            }
            .Toastify__toast-container--rtl {
              right: 0;
              left: initial;
            }
          }

          .Toastify__toast {
            position: relative;
            min-height: 64px;
            box-sizing: border-box;
            margin-bottom: 1rem;
            padding: 8px;
            border-radius: 1px;
            box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1),
              0 2px 15px 0 rgba(0, 0, 0, 0.05);
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            max-height: 800px;
            overflow: hidden;
            font-family: sans-serif;
            cursor: pointer;
            direction: ltr;
          }
          .Toastify__toast--rtl {
            direction: rtl;
          }
          .Toastify__toast--default {
            background: #fff;
            color: #aaa;
          }
          .Toastify__toast--info {
            background: #3498db;
          }
          .Toastify__toast--success {
            background: #07bc0c;
          }
          .Toastify__toast--warning {
            background: #f1c40f;
          }
          .Toastify__toast--error {
            background: #e74c3c;
          }
          .Toastify__toast-body {
            margin: auto 0;
            -ms-flex: 1;
            flex: 1;
          }

          @media only screen and (max-width: 480px) {
            .Toastify__toast {
              margin-bottom: 0;
            }
          }

          .Toastify__close-button {
            color: #fff;
            font-weight: bold;
            font-size: 14px;
            background: transparent;
            outline: none;
            border: none;
            padding: 0;
            cursor: pointer;
            opacity: 0.7;
            transition: 0.3s ease;
            -ms-flex-item-align: start;
            align-self: flex-start;
          }
          .Toastify__close-button--default {
            color: #000;
            opacity: 0.3;
          }
          .Toastify__close-button:hover,
          .Toastify__close-button:focus {
            opacity: 1;
          }

          @keyframes Toastify__trackProgress {
            0% {
              transform: scaleX(1);
            }
            100% {
              transform: scaleX(0);
            }
          }

          .Toastify__progress-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 5px;
            z-index: 9999;
            opacity: 0.7;
            background-color: rgba(255, 255, 255, 0.7);
            transform-origin: left;
          }
          .Toastify__progress-bar--animated {
            animation: Toastify__trackProgress linear 1 forwards;
          }
          .Toastify__progress-bar--controlled {
            transition: transform 0.2s;
          }
          .Toastify__progress-bar--rtl {
            right: 0;
            left: initial;
            transform-origin: right;
          }
          .Toastify__progress-bar--default {
            background: linear-gradient(
              to right,
              #4cd964,
              #5ac8fa,
              #007aff,
              #34aadc,
              #5856d6,
              #ff2d55
            );
          }

          @keyframes Toastify__bounceInRight {
            from,
            60%,
            75%,
            90%,
            to {
              animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }
            from {
              opacity: 0;
              transform: translate3d(3000px, 0, 0);
            }
            60% {
              opacity: 1;
              transform: translate3d(-25px, 0, 0);
            }
            75% {
              transform: translate3d(10px, 0, 0);
            }
            90% {
              transform: translate3d(-5px, 0, 0);
            }
            to {
              transform: none;
            }
          }

          @keyframes Toastify__bounceOutRight {
            20% {
              opacity: 1;
              transform: translate3d(-20px, 0, 0);
            }
            to {
              opacity: 0;
              transform: translate3d(2000px, 0, 0);
            }
          }

          @keyframes Toastify__bounceInLeft {
            from,
            60%,
            75%,
            90%,
            to {
              animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }
            0% {
              opacity: 0;
              transform: translate3d(-3000px, 0, 0);
            }
            60% {
              opacity: 1;
              transform: translate3d(25px, 0, 0);
            }
            75% {
              transform: translate3d(-10px, 0, 0);
            }
            90% {
              transform: translate3d(5px, 0, 0);
            }
            to {
              transform: none;
            }
          }

          @keyframes Toastify__bounceOutLeft {
            20% {
              opacity: 1;
              transform: translate3d(20px, 0, 0);
            }
            to {
              opacity: 0;
              transform: translate3d(-2000px, 0, 0);
            }
          }

          @keyframes Toastify__bounceInUp {
            from,
            60%,
            75%,
            90%,
            to {
              animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }
            from {
              opacity: 0;
              transform: translate3d(0, 3000px, 0);
            }
            60% {
              opacity: 1;
              transform: translate3d(0, -20px, 0);
            }
            75% {
              transform: translate3d(0, 10px, 0);
            }
            90% {
              transform: translate3d(0, -5px, 0);
            }
            to {
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes Toastify__bounceOutUp {
            20% {
              transform: translate3d(0, -10px, 0);
            }
            40%,
            45% {
              opacity: 1;
              transform: translate3d(0, 20px, 0);
            }
            to {
              opacity: 0;
              transform: translate3d(0, -2000px, 0);
            }
          }

          @keyframes Toastify__bounceInDown {
            from,
            60%,
            75%,
            90%,
            to {
              animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }
            0% {
              opacity: 0;
              transform: translate3d(0, -3000px, 0);
            }
            60% {
              opacity: 1;
              transform: translate3d(0, 25px, 0);
            }
            75% {
              transform: translate3d(0, -10px, 0);
            }
            90% {
              transform: translate3d(0, 5px, 0);
            }
            to {
              transform: none;
            }
          }

          @keyframes Toastify__bounceOutDown {
            20% {
              transform: translate3d(0, 10px, 0);
            }
            40%,
            45% {
              opacity: 1;
              transform: translate3d(0, -20px, 0);
            }
            to {
              opacity: 0;
              transform: translate3d(0, 2000px, 0);
            }
          }

          .Toastify__bounce-enter--top-left,
          .Toastify__bounce-enter--bottom-left {
            animation-name: Toastify__bounceInLeft;
          }

          .Toastify__bounce-enter--top-right,
          .Toastify__bounce-enter--bottom-right {
            animation-name: Toastify__bounceInRight;
          }

          .Toastify__bounce-enter--top-center {
            animation-name: Toastify__bounceInDown;
          }

          .Toastify__bounce-enter--bottom-center {
            animation-name: Toastify__bounceInUp;
          }

          .Toastify__bounce-exit--top-left,
          .Toastify__bounce-exit--bottom-left {
            animation-name: Toastify__bounceOutLeft;
          }

          .Toastify__bounce-exit--top-right,
          .Toastify__bounce-exit--bottom-right {
            animation-name: Toastify__bounceOutRight;
          }

          .Toastify__bounce-exit--top-center {
            animation-name: Toastify__bounceOutUp;
          }

          .Toastify__bounce-exit--bottom-center {
            animation-name: Toastify__bounceOutDown;
          }

          @keyframes Toastify__zoomIn {
            from {
              opacity: 0;
              transform: scale3d(0.3, 0.3, 0.3);
            }
            50% {
              opacity: 1;
            }
          }

          @keyframes Toastify__zoomOut {
            from {
              opacity: 1;
            }
            50% {
              opacity: 0;
              transform: scale3d(0.3, 0.3, 0.3);
            }
            to {
              opacity: 0;
            }
          }

          .Toastify__zoom-enter {
            animation-name: Toastify__zoomIn;
          }

          .Toastify__zoom-exit {
            animation-name: Toastify__zoomOut;
          }

          @keyframes Toastify__flipIn {
            from {
              transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
              animation-timing-function: ease-in;
              opacity: 0;
            }
            40% {
              transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
              animation-timing-function: ease-in;
            }
            60% {
              transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
              opacity: 1;
            }
            80% {
              transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
            }
            to {
              transform: perspective(400px);
            }
          }

          @keyframes Toastify__flipOut {
            from {
              transform: perspective(400px);
            }
            30% {
              transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
              opacity: 1;
            }
            to {
              transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
              opacity: 0;
            }
          }

          .Toastify__flip-enter {
            animation-name: Toastify__flipIn;
          }

          .Toastify__flip-exit {
            animation-name: Toastify__flipOut;
          }

          @keyframes Toastify__slideInRight {
            from {
              transform: translate3d(110%, 0, 0);
              visibility: visible;
            }
            to {
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes Toastify__slideInLeft {
            from {
              transform: translate3d(-110%, 0, 0);
              visibility: visible;
            }
            to {
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes Toastify__slideInUp {
            from {
              transform: translate3d(0, 110%, 0);
              visibility: visible;
            }
            to {
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes Toastify__slideInDown {
            from {
              transform: translate3d(0, -110%, 0);
              visibility: visible;
            }
            to {
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes Toastify__slideOutRight {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              visibility: hidden;
              transform: translate3d(110%, 0, 0);
            }
          }

          @keyframes Toastify__slideOutLeft {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              visibility: hidden;
              transform: translate3d(-110%, 0, 0);
            }
          }

          @keyframes Toastify__slideOutDown {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              visibility: hidden;
              transform: translate3d(0, 500px, 0);
            }
          }

          @keyframes Toastify__slideOutUp {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              visibility: hidden;
              transform: translate3d(0, -500px, 0);
            }
          }

          .Toastify__slide-enter--top-left,
          .Toastify__slide-enter--bottom-left {
            animation-name: Toastify__slideInLeft;
          }

          .Toastify__slide-enter--top-right,
          .Toastify__slide-enter--bottom-right {
            animation-name: Toastify__slideInRight;
          }

          .Toastify__slide-enter--top-center {
            animation-name: Toastify__slideInDown;
          }

          .Toastify__slide-enter--bottom-center {
            animation-name: Toastify__slideInUp;
          }

          .Toastify__slide-exit--top-left,
          .Toastify__slide-exit--bottom-left {
            animation-name: Toastify__slideOutLeft;
          }

          .Toastify__slide-exit--top-right,
          .Toastify__slide-exit--bottom-right {
            animation-name: Toastify__slideOutRight;
          }

          .Toastify__slide-exit--top-center {
            animation-name: Toastify__slideOutUp;
          }

          .Toastify__slide-exit--bottom-center {
            animation-name: Toastify__slideOutDown;
          }

          .notification {
            width: 100%;
            border-radius: 3px;
            position: fixed;
            font-size: 16px;
            font-weight: 400;

            &.error {
              color: #fff;
              background: #d64242;
            }
            &.success {
              color: #fff;
              background: ${THEME_COLOR};
            }
          }
          .progress {
            background: white;
            height: 2px;
          }
          form {
            .notification {
              position: relative;
              margin-bottom: 15px;
              padding: 10px 15px;
            }
            button {
              background: ${THEME_COLOR};
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
              border: none;
              color: white;
              width: 50%;
              height: 40px;
              cursor: pointer;
              transition: 0.2s all ease;
              outline: none;
              margin-top: 20px;

              &:active,
              &:hover,
              &:focus {
                background-color: ${THEME_COLOR_HOVER};
              }
            }
            label {
              width: 100%;
              font-family: Roboto;
              font-style: normal;
              font-weight: bold;
              font-size: 12px;
              line-height: normal;
              margin-bottom: 25px;
              display: block;
              color: ${THEME_COLOR};
            }
            input {
              width: 100%;
              border: none;
              padding: 20px 20px 20px 0;
              font-family: Roboto;
              font-style: normal;
              font-weight: normal;
              font-size: 16px;
              line-height: normal;
              border-bottom: 1px solid ${THEME_COLOR};
              height: 40px;
              color: #000000;
              outline: none;
              transition: 1s all ease;

              &:focus {
                border-bottom: 1px solid ${THEME_COLOR_HOVER};
              }

              &::placeholder {
                font-style: normal;
                font-weight: normal;
                font-size: 16px;
                line-height: normal;

                color: #000000;
              }
            }
          }
          h1 {
            margin: 0 0 30px 0;
            font-family: Roboto;
            font-style: normal;
            font-weight: 900;
            font-size: 36px;
            line-height: normal;
            color: #111;
          }
          p {
            margin: 0 0 20px 0;
            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            line-height: 25px;
            color: #757575;
          }
          .link-label {
            color: #757575;
            line-height: 1.35;
            text-decoration: none;
            font-size: 12px;
            letter-spacing: 0.02em;
            margin-left: 30px;

            a {
              color: ${THEME_COLOR};
              transition: 0.2s all ease;

              &:hover {
                color: ${THEME_COLOR_HOVER};
              }
            }
            &--bottom {
              margin: 25px 0 0 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CSSFiles;
