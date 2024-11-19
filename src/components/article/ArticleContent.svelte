<script>
	import { onMount } from "svelte";
	import { browser } from '$app/environment';

    import EditorJS from '@editorjs/editorjs';
    import Header from "@editorjs/header";
    import LinkTool from "@editorjs/link";
    import Hyperlink from 'editorjs-hyperlink';
    import ToggleBlock from 'editorjs-toggle-block';
    import Quote from '@editorjs/quote';
    import Paragraph from '@editorjs/paragraph';
    import Alert from 'editorjs-alert';
    import Warning from "@editorjs/warning";
    import Code from "@editorjs/code";
    import Delimiter from "@editorjs/delimiter";
    import NestedList from '@editorjs/nested-list';
    import Checklist from '@editorjs/checklist';
    import Embed from '@editorjs/embed';
    import ImageTool from '@editorjs/image';
    import MermaidTool from "editorjs-mermaid";
    import Table from '@editorjs/table';
    import AnyButton from "editorjs-button";
    import Marker from '@editorjs/marker';
    import Underline from '@editorjs/underline';
    import ChangeCase from 'editorjs-change-case';
    import Strikethrough from '@sotaproject/strikethrough';
    import Tooltip from 'editorjs-tooltip';
    import DragDrop from 'editorjs-drag-drop';
    import Undo from 'editorjs-undo';
    import { StyleInlineTool } from "editorjs-style";
    import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
    //import EditorJsColumns from "@calumk/editorjs-columns"

	import {log} from "$utils/debug";

    export let isReadOnly = true;
    export let folderId;
    export let content = {};

	onMount(() => {
		if(browser){
			const editor = new EditorJS({
				onReady: () => {
					new Undo({ editor });
					new DragDrop(editor);
					MermaidTool.config({ 'theme': 'neutral' });
				},
				autofocus: false,
				data: content,
				readOnly: isReadOnly,
				logLevel: 'ERROR',
				tools: {
					/*
					columns : {
						class : EditorJsColumns,
						config : {
							tools : {
								header : Header,
								alert : Alert,
								paragraph : Paragraph,
								delimiter : Delimiter,
								toggle : ToggleBlock,
								quote : Quote,
								list : NestedList,
								checklist : Checklist,
								code : Code,
								embed: Embed,
								AnyButton: {
									class: AnyButton,
									inlineToolbar: false,
								},
							},
							EditorJsLibrary : EditorJS
						}
					},
					*/
					underline: {
						class: Underline,
						inlineToolbar: true,
					},
					strikethrough: Strikethrough,
					header: {
						class: Header,
						inlineToolbar : true,
						config: {
							placeholder: 'Enter a header',
							levels: [1, 2, 3, 4],
							defaultLevel: 3
						}
					},
					Marker: {
						class: Marker,
						shortcut: 'CMD+SHIFT+M',
					},
					linkTool: {
						class: LinkTool,
						config: {
							endpoint: '/api/crawler', // Your backend endpoint for url data fetching,
						}
					},
					hyperlink: {
						class: Hyperlink,
						config: {
							shortcut: 'CMD+L',
							target: '_blank',
							rel: 'nofollow',
							availableTargets: ['_blank', '_self', '_parent', '_top'],
							availableRels: ['alternate', 'author', 'bookmark', 'external', 'help', 'license', 'next', 'nofollow', 'noreferrer', 'noopener', 'prev', 'search', 'tag', 'nofollow noreferrer noopener'],
							validate: false,
						}
					},
					style: StyleInlineTool,
					toggle: {
						class: ToggleBlock,
						inlineToolbar: true,
					},
					quote: {
						class: Quote,
						inlineToolbar: true,
					},
					list: {
						class: NestedList,
						inlineToolbar: true,
					},
					checklist: {
						class: Checklist,
						inlineToolbar: true,
					},
					paragraph: {
						title: "Nested List",
						class: Paragraph,
						inlineToolbar: true,
					},
					alert: {
						class: Alert,
						inlineToolbar: true,
					},
					warning: {
						class: Warning,
						inlineToolbar: true,
					},
					code: {
						class: Code,
						inlineToolbar: true,
					},
					embed: Embed,
					image: {
						class: ImageTool,
						config: {
							endpoints: {
								byFile: "/api/editor/UploadImage/"+folderId+"/content", // Your backend file uploader endpoint
								byUrl: "/api/editor/DownloadImage/"+folderId+"/content", // Your endpoint that provides uploading by Url
							}
						}
					},
					mermaid: MermaidTool,
					delimiter: Delimiter,
					table: {
						class: Table,
						inlineToolbar: true
					},
					AnyButton: {
						class: AnyButton,
						inlineToolbar: false,
					},
					changeCase: ChangeCase,
					tooltip: {
						class: Tooltip,
						config: {
							location: 'top',
							highlightColor: '',
							underline: true,
							backgroundColor: '#22c55e',
							textColor: '#ffffff',
							holder: 'editorjs',
						}
					},
					alignmentTune: {
						class: AlignmentTuneTool,
						inlineToolbar: true,
					},
				},
				tunes: ["alignmentTune"]
			});
		}
	});
</script>
<svelte:head>
    <style>
        .ce-toolbar__plus, .ce-toolbar__settings-btn {
            border: white;
            background-color: white;
        }
        .ce-toolbar__plus:hover, .ce-toolbar__settings-btn:hover{
            background-color: gray;
        }
        .ce-inline-toolbar{
            color: black
        }
        .codex-editor__redactor{
            padding-bottom: 0px !important;
        }
        .ce-block__content{
            margin: 0px;
            margin-left: 30px;
            max-width: 100%;
        }
        .ce-toolbar__content{
            position: absolute;
        }
        .ce-popover.ce-popover--opened{
            @apply ml-4;
            z-index: 9999 !important;
        }
        .cdx-input.mermaid-input{
            @apply bg-slate-900;
            color:#fff;
        }
        .svelecte.svelecte-control, .sv-control{
            @apply bg-slate-900 !important;
            @apply text-white !important;
            @apply border-transparent !important;
            @apply rounded-md !important;
            @apply pl-1 !important;
        }
        .sv-dropdown, .sv-dropdown-scroll{
            @apply bg-slate-900 !important;
        }
        .sv-item, .sv-item-content{
            @apply bg-slate-900 !important;
            @apply text-white !important;
        }
        .sv-item:hover, .sv-item-content:hover, .sv-item:hover > .sv-item-content {
            @apply bg-slate-700 !important;
        }
        .toggle-block__icon {
            display: inline-block
        }
    </style>
</svelte:head>

<div id="editorjs" class="w-full"></div>