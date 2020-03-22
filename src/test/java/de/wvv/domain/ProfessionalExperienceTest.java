package de.wvv.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.wvv.web.rest.TestUtil;

public class ProfessionalExperienceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfessionalExperience.class);
        ProfessionalExperience professionalExperience1 = new ProfessionalExperience();
        professionalExperience1.setId(1L);
        ProfessionalExperience professionalExperience2 = new ProfessionalExperience();
        professionalExperience2.setId(professionalExperience1.getId());
        assertThat(professionalExperience1).isEqualTo(professionalExperience2);
        professionalExperience2.setId(2L);
        assertThat(professionalExperience1).isNotEqualTo(professionalExperience2);
        professionalExperience1.setId(null);
        assertThat(professionalExperience1).isNotEqualTo(professionalExperience2);
    }
}
