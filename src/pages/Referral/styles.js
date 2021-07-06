import styled from "styled-components";

export const ReferralWrapper = styled.div`
    grid-template-columns: repeat(12, 1fr);
    width: 100vw;
    background: #8865D9;
    background: -webkit-linear-gradient(bottom left, #8865D9, #A5C8AB);
    background: -moz-linear-gradient(bottom left, #8865D9, #A5C8AB);
    background: linear-gradient(to top right, #8865D9, #A5C8AB);
    padding: 3em;
    grid-gap: 2em;

    .generate {
        grid-column: 1/5;
        width: 100%;
        height: 100%;
        place-items: center;
        background: var(--mainWhite);
        border: .09em solid gray;
        border-radius: .5em;
        letter-spacing: var(--mainSpacing);
        
        header {
            font-size: 1.17em;
            font-weight: 500;
            width: 100%;
            border-bottom: inherit;
            text-align: center;
            padding: .75em 0;

            h1 {
                font-size: 1.17em;
            }
        }

        .networkImage {
            width: 100%;
            place-items: center;
            padding: .75em 0;
        }

        .content {
            place-items: center;
            padding: 0 2.5em;
        }

        form {
            width: 100%;
            margin: 2em auto;
            border-radius: .25em;
            grid-gap: 1em 0;
            padding: 0 1.5em;

            input {
                height: 50px;
                padding: 0 .5em;
                border-radius: .5em;
                border: .1em solid gray;
            }

            button {
                height: 50px;
                padding: 0 .5em;
                border-radius: .5em;
                background: var(--mainGreen);
                color: var(--white);
                outline: none;
                border: none;
                transition: var(--mainTransition);
                letter-spacing: var(--mainSpacing);
                text-transform: uppercase;
                
                &:hover {
                    background: transparent;
                    color: var(--darkGrey);
                    border: .1em solid var(--mainGreen);
                }
            }
        }
    }

    .container {
        grid-column: 5/13;
        width: 100%;
        height: 100%;
    }

    @media(max-width: 1200px) {
        & {
            grid-template-columns: repeat(1, 1fr);
            padding: 3em 1em;
            grid-gap: 2em 1em;

            .generate {
                grid-column: 1/13;
                grid-row: 1;
                margin: 0 auto;
                width: 80%;
            }

            .container { 
                grid-column: 1/13;
                grid-row: 2;
                margin: 0 auto;
                width: 100%;
            }
        }


        @media(max-width: 767px) {
            & {
                grid-template-columns: 1fr;
                padding: 3em .5em;
    
                .generate {
                    grid-columns: 1;

                    form { padding: 0 1em; }
                }

                .container { display: none; }
            }
        }
    }
`;