import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

//Styles    ###########################################################

import { } from './styles';

import { Container, Scroller, LoadingIcon } from '../../../styles/Basic';

import { BackgroundImageProfile } from '../../../styles/Image';

import { PageBodyProfile, Linha, DescriptionProfileArea, DescriptionArea } from '../../../styles/View';

import { Title, Text, TextBold, SubTitle, ButtonWhiteText } from '../../../styles/Text';

import { BackButtom, PdfButton, PerfilButton } from '../../../styles/Button';

//Styles END ###########################################################

import BackIcon from '../../../../assets/back.svg';
import CertificateIcon from '../../../../assets/certificate.svg';
import SuitcaseIcon from '../../../../assets/suitcase.svg';



import Api from '../../../../Api';
import InfoTopProfile from '../../../../components/InfoTopProfile';

import * as OpenAnyThing from 'react-native-openanything';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [usuarioInfo, setUsuarioInfo] = useState({
        id: route.params.id,
        nome: route.params.nomeUsuario,
    });

    const [loading, setLoading] = useState(false);


    const getPerfilUsuario = async () => {
        setLoading(true)
        let json = await Api.getPerfilUsuario(usuarioInfo.id);
        if (json) {
            setUsuarioInfo(json);
        } else {
            alert("Erro: " + json.error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getPerfilUsuario();
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
    }

    const handleExperiencia = () => {
        navigation.navigate('ProfileExperienciaFormacao', {
            nome: usuarioInfo.nome,
            email: usuarioInfo.email,
            experiencia: usuarioInfo.experiencia,
            formacao: '',
        });
    }

    const handlFormacao = () => {
        navigation.navigate('ProfileExperienciaFormacao', {
            nome: usuarioInfo.nome,
            email: usuarioInfo.email,
            experiencia: '',
            formacao: usuarioInfo.formacao,
        });
    }


    return (
        <Container>
            <Scroller>
                <BackgroundImageProfile />
                <PageBodyProfile>

                    <InfoTopProfile nome={usuarioInfo.nome} email={usuarioInfo.email} image={''} />


                    {loading &&
                        <LoadingIcon size="large" color="#63C2D1" />
                    }

                    <PerfilButton onPress={() => handleExperiencia()}>
                        <SuitcaseIcon width="24" height="24" fill="#268596" />
                        <Text>Experi??ncias</Text>
                    </PerfilButton>

                    <PerfilButton onPress={() => handlFormacao()}>
                        <CertificateIcon width="24" height="24" fill="#268596" />
                        <Text>Forma????es</Text>
                    </PerfilButton>

                    {usuarioInfo.linkCurriculo != null &&
                        <PdfButton onPress={() => OpenAnyThing.Pdf(usuarioInfo.linkCurriculo)}>
                            <ButtonWhiteText>Visualizar o curr??culo</ButtonWhiteText>
                        </PdfButton>
                    }


                    <Linha />

                    <SubTitle>Detalhes</SubTitle>
                    <DescriptionProfileArea>

                        <TextBold>Status: <Text>{usuarioInfo.status}</Text></TextBold>

                        {usuarioInfo.dataNascimento &&
                            <><Linha />
                                <TextBold>Data de nascimento: <Text>{usuarioInfo.dataNascimentoFormatado}</Text></TextBold>
                            </>
                        }
                    </DescriptionProfileArea>

                    <SubTitle>Contatos</SubTitle>
                    <DescriptionArea>
                        <TextBold>Email: <Text>{usuarioInfo.email}</Text></TextBold>
                        {usuarioInfo.celular &&
                            <TextBold>Celular: <Text>{usuarioInfo.celular}</Text></TextBold>
                        }
                        {usuarioInfo.telefone &&
                            <TextBold>Telefone: <Text>{usuarioInfo.telefone}</Text></TextBold>
                        }
                    </DescriptionArea>

                    {usuarioInfo.cep &&
                        <>
                            <SubTitle>Localiza????o</SubTitle>
                            <DescriptionArea>
                                <TextBold>Cidade: <Text>{usuarioInfo.localidade}</Text></TextBold>
                                <TextBold>Estado: <Text>{usuarioInfo.uf}</Text></TextBold>
                                <TextBold>Rua: <Text>{usuarioInfo.logradouro}</Text></TextBold>
                                {usuarioInfo.complemento &&
                                    <TextBold>N??mero: <Text>{usuarioInfo.numero}</Text></TextBold>
                                }
                                {usuarioInfo.complemento &&
                                    <TextBold>Complemento: <Text>{usuarioInfo.complemento}</Text></TextBold>
                                }
                            </DescriptionArea>
                        </>
                    }

                    <DescriptionArea>
                        <TextBold>Data de cria????o do perfil: <Text>{usuarioInfo.dataCriacaoPerfil}</Text></TextBold>
                    </DescriptionArea>

                </PageBodyProfile>

            </Scroller>
            <BackButtom onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButtom>

        </Container>
    );
}