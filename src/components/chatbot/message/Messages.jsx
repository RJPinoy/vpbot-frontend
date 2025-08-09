import { parseMarkdown } from '../../../utils';

const Messages = ({ chat, fontColor2, secondaryColor }) => {
    return (
        <>
            {chat.map((msg, idx) => {
                const { role, content } = msg;
                const text = content?.[0]?.text.value || '';

                return (
                    <div
                        key={idx}
                        className={`max-w-3/4 w-fit rounded-md p-2 mb-2 ${
                        role === 'assistant' ? 
                            'rounded-bl-none'
                            : 'rounded-br-none ml-auto brightness-150'
                        }`}
                        style={{
                            backgroundColor: secondaryColor,
                            color: fontColor2,
                        }}
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }}
                    />
                );
            })}
        </>
    );
};

export default Messages;