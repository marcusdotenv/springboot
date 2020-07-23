package br.ufrn.autopoc.model;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;

@Entity
@EnableAutoConfiguration
@Table(name="bomba")
public class Bomba {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    
    //Atributos de entrada
    @Column(name="nome")
    private String nome;
    
    @Column(name="vazao_desejada")
    private double vazaoDesejada;

    @Column(name="fabricante")
		private String fabricante;

		@Column(name="diametro_externo")
		private double diamExterno;
    
    @Column(name="range_vazao_minima")
    private int rangeVazaoMinima;

    @Column(name="vazao_nominal")
    private int vazaoNominal;

    @Column(name="vazao_maxima")
    private int vazaoMaxima;

    @Column(name="coef_head_x0")
    private double curvaHeadX0;

    @Column(name="coef_head_x1")
    private double curvaHeadX1;

    @Column(name="coef_head_x2")
    private double curvaHeadX2;

    @Column(name="coef_head_x3")
    private double curvaHeadX3;

    @Column(name="coef_head_x4")
    private double curvaHeadX4;

    @Column(name="coef_head_x5")
    private double curvaHeadX5;

    @Column(name="coef_pot_x0")
    private double curvaPotenciaX0;

    @Column(name="coef_pot_x1")
    private double curvaPotenciaX1;

    @Column(name="coef_pot_x2")
    private double curvaPotenciaX2;

    @Column(name="coef_pot_x3")
    private double curvaPotenciaX3;

    @Column(name="coef_pot_x4")
    private double curvaPotenciaX4;

    @Column(name="coef_pot_x5")
		private double curvaPotenciaX5;

    //Atributos de saída (não persistidas no banco)
		@Transient 
		private boolean efeitoGas;

		@Transient
    private boolean efeitoViscosidade;

		@Transient 
		private double headEstagio;

		@Transient 
		private double potEstagio;

		@Transient 
		private double eficiencia;

		@Transient 
		private double viscosidadeSuccao;

		@Transient 
		private int qntdEstagios;

		@Transient 
		private double headTotal;

		@Transient 
		private double BHPtotal;

    //Construtores
    //Necessário a criação do construtor vazio para uso do Data-Rest*
    public Bomba() {
    }
           
    public Bomba(String nome, double vazaoDesejada, String fabricante, int rangeVazaoMin, int rangeVazaoMinima,
			int vazaoNominal, int vazaoMaxima, double curvaHeadX0, double curvaHeadX1, double curvaHeadX2,
			double curvaHeadX3, double curvaHeadX4, double curvaHeadX5, double curvaPotenciaX0, double curvaPotenciaX1,
			double curvaPotenciaX2, double curvaPotenciaX3, double curvaPotenciaX4, double curvaPotenciaX5) {
		this.nome = nome;
		this.vazaoDesejada = vazaoDesejada;
		this.fabricante = fabricante;
		this.rangeVazaoMinima = rangeVazaoMinima;
		this.vazaoNominal = vazaoNominal;
		this.vazaoMaxima = vazaoMaxima;
		this.curvaHeadX0 = curvaHeadX0;
		this.curvaHeadX1 = curvaHeadX1;
		this.curvaHeadX2 = curvaHeadX2;
		this.curvaHeadX3 = curvaHeadX3;
		this.curvaHeadX4 = curvaHeadX4;
		this.curvaHeadX5 = curvaHeadX5;
		this.curvaPotenciaX0 = curvaPotenciaX0;
		this.curvaPotenciaX1 = curvaPotenciaX1;
		this.curvaPotenciaX2 = curvaPotenciaX2;
		this.curvaPotenciaX3 = curvaPotenciaX3;
		this.curvaPotenciaX4 = curvaPotenciaX4;
		this.curvaPotenciaX5 = curvaPotenciaX5;
	}
    
    //Getters/Setters
    
	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

	public double getVazaoDesejada() {
		return vazaoDesejada;
	}

	public void setVazaoDesejada(double vazaoDesejada) {
		this.vazaoDesejada = vazaoDesejada;
	}

	public String getFabricante() {
		return fabricante;
	}

	public void setFabricante(String fabricante) {
		this.fabricante = fabricante;
	}


	public int getRangeVazaoMinima() {
		return rangeVazaoMinima;
	}

	public void setRangeVazaoMinima(int rangeVazaoMinima) {
		this.rangeVazaoMinima = rangeVazaoMinima;
	}

	public int getVazaoNominal() {
		return vazaoNominal;
	}

	public void setVazaoNominal(int vazaoNominal) {
		this.vazaoNominal = vazaoNominal;
	}

	public int getVazaoMaxima() {
		return vazaoMaxima;
	}

	public void setVazaoMaxima(int vazaoMaxima) {
		this.vazaoMaxima = vazaoMaxima;
	}

	public double getCurvaHeadX0() {
		return curvaHeadX0;
	}

	public void setCurvaHeadX0(double curvaHeadX0) {
		this.curvaHeadX0 = curvaHeadX0;
	}

	public double getCurvaHeadX1() {
		return curvaHeadX1;
	}

	public void setCurvaHeadX1(double curvaHeadX1) {
		this.curvaHeadX1 = curvaHeadX1;
	}

	public double getCurvaHeadX2() {
		return curvaHeadX2;
	}

	public void setCurvaHeadX2(double curvaHeadX2) {
		this.curvaHeadX2 = curvaHeadX2;
	}

	public double getCurvaHeadX3() {
		return curvaHeadX3;
	}

	public void setCurvaHeadX3(double curvaHeadX3) {
		this.curvaHeadX3 = curvaHeadX3;
	}

	public double getCurvaHeadX4() {
		return curvaHeadX4;
	}

	public void setCurvaHeadX4(double curvaHeadX4) {
		this.curvaHeadX4 = curvaHeadX4;
	}

	public double getCurvaHeadX5() {
		return curvaHeadX5;
	}

	public void setCurvaHeadX5(double curvaHeadX5) {
		this.curvaHeadX5 = curvaHeadX5;
	}

	public double getCurvaPotenciaX0() {
		return curvaPotenciaX0;
	}

	public void setCurvaPotenciaX0(double curvaPotenciaX0) {
		this.curvaPotenciaX0 = curvaPotenciaX0;
	}

	public double getCurvaPotenciaX1() {
		return curvaPotenciaX1;
	}

	public void setCurvaPotenciaX1(double curvaPotenciaX1) {
		this.curvaPotenciaX1 = curvaPotenciaX1;
	}

	public double getCurvaPotenciaX2() {
		return curvaPotenciaX2;
	}

	public void setCurvaPotenciaX2(double curvaPotenciaX2) {
		this.curvaPotenciaX2 = curvaPotenciaX2;
	}

	public double getCurvaPotenciaX3() {
		return curvaPotenciaX3;
	}

	public void setCurvaPotenciaX3(double curvaPotenciaX3) {
		this.curvaPotenciaX3 = curvaPotenciaX3;
	}

	public double getCurvaPotenciaX4() {
		return curvaPotenciaX4;
	}

	public void setCurvaPotenciaX4(double curvaPotenciaX4) {
		this.curvaPotenciaX4 = curvaPotenciaX4;
	}

	public double getCurvaPotenciaX5() {
		return curvaPotenciaX5;
	}

	public void setCurvaPotenciaX5(double curvaPotenciaX5) {
		this.curvaPotenciaX5 = curvaPotenciaX5;
	}

	public boolean isEfeitoGas() {
		return efeitoGas;
	}

	public void setEfeitoGas(boolean efeitoGas) {
		this.efeitoGas = efeitoGas;
	}

	public boolean isEfeitoViscosidade() {
		return efeitoViscosidade;
	}

	public void setEfeitoViscosidade(boolean efeitoViscosidade) {
		this.efeitoViscosidade = efeitoViscosidade;
	}

	public double getHeadEstagio() {
		return headEstagio;
	}

	public void setHeadEstagio(double headEstagio) {
		this.headEstagio = headEstagio;
	}

	public double getPotEstagio() {
		return potEstagio;
	}

	public void setPotEstagio(double potEstagio) {
		this.potEstagio = potEstagio;
	}

	public double getEficiencia() {
		return eficiencia;
	}

	public void setEficiencia(double eficiencia) {
		this.eficiencia = eficiencia;
	}

	public double getViscosidadeSuccao() {
		return viscosidadeSuccao;
	}

	public void setViscosidadeSuccao(double viscosidadeSuccao) {
		this.viscosidadeSuccao = viscosidadeSuccao;
	}

	public int getQntdEstagios() {
		return qntdEstagios;
	}

	public void setQntdEstagios(int qntdEstagios) {
		this.qntdEstagios = qntdEstagios;
	}

	public double getDiamExterno() {
		return diamExterno;
	}

	public void setDiamExterno(double diamExterno) {
		this.diamExterno = diamExterno;
	}

	public double getHeadTotal() {
		return headTotal;
	}

	public void setHeadTotal(double headTotal) {
		this.headTotal = headTotal;
	}

	public double getBHPtotal() {
		return BHPtotal;
	}

	public void setBHPtotal(double bHPtotal) {
		BHPtotal = bHPtotal;
	}
	
	//To String
	@Override
	public String toString() {
		return "Bomba [id=" + id + ", nome=" + nome + ", vazaoDesejada=" + vazaoDesejada + ", fabricante=" + fabricante
				+ "]";
	}

    
}